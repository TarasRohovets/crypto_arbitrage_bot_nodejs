require('dotenv').config();
import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider';
import DaiContract from "./cryptocurrencies/dai-contract";
import UniswapExchange from "./exchanges/uniswap-exchange";
import moment from "moment";

class ArbitrageBot {

    // Web3 Config
    web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RPC_URL));;
    // minimum eth to swap
    ETH_AMOUNT = this.web3.utils.toWei('1', "Ether");
    ETH_SELL_PRICE = this.web3.utils.toWei('400', 'Ether');
    priceMonitor;
    monitoringPrice = false;
    // Contracts
    daiContract = new DaiContract();
    // Exchanges
    uniswapExchange = new UniswapExchange();

    async sellEth(ethAmount, daiAmount) {
        const now = moment().unix();
        const DEADLINE = now + 60;
        const SETTINGS = {
            gasLimit: 8000000,
            gasPrice: this.web3.utils.toWei('50', 'Gwei'),
            from: process.env.ACCOUNT,
            value: ethAmount
        }
        // tslint:disable-next-line: no-console
        console.log('Performing swap');
        const result = await this.uniswapExchange.uniswapExchange.methods.ethToTokenSwapInput(daiAmount.toString(), DEADLINE).send(SETTINGS);
        // tslint:disable-next-line: no-console
        console.log(`Successful Swap: https://ropsten.etherscan.io/tx/${result.transactionHash}`)
    }

    async checkBalances() {
        let balance;

        // Check Ether balance swap
        balance = await this.web3.eth.getBalance(process.env.ACCOUNT);
        balance = this.web3.utils.fromWei(balance, "Ether");
        // tslint:disable-next-line: no-console
        console.log("Ether Balance: ", balance);

        // Check Dai balance swap
        balance = await this.daiContract.daiContract.methods.balanceOf(process.env.ACCOUNT).call();
        balance = this.web3.utils.fromWei(balance, 'Ether');
        // tslint:disable-next-line: no-console
        console.log("Dai Balance: ", balance);
    }

    async monitorPrice() {
        if (this.monitoringPrice) {
            return;
        }
        // tslint:disable-next-line: no-console
        console.log("Checking price...");
        this.monitoringPrice = true;

        try {
            // Check Eth Price
            const daiAmount = await this.uniswapExchange.uniswapExchange.methods.getEthToTokenInputPrice(this.ETH_AMOUNT).call();
            const price = this.web3.utils.fromWei(daiAmount.toString(), 'Ether');
            // tslint:disable-next-line: no-console
            console.log('Eth Price: ', price, ' DAI');

            if (price <= this.ETH_SELL_PRICE) {
                // tslint:disable-next-line: no-console
                console.log('Selling Eth ');
                // Check balance before sale
                await this.checkBalances();

                // Sell Eth
                await this.sellEth(this.ETH_AMOUNT, daiAmount);

                // Check balance after sale
                await this.checkBalances();

                // Stop monitoring prices
                clearInterval(this.priceMonitor)
            }

        } catch (err) {
            // tslint:disable-next-line: no-console
            console.error(err);
            this.monitoringPrice = false;
            clearInterval(this.priceMonitor);
            return;
        }

        this.monitoringPrice = false;
    }

}

export default ArbitrageBot;