require('dotenv').config();
import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider';
import DaiContract from "./cryptocurrencies/dai-contract";
import UniswapExchange from "./exchanges/uniswap-exchange";
import KyberExchange from "./exchanges/kyber-exchange";
import moment from 'moment';
import 'moment-timezone';


class ArbitrageBot {

    // Web3 Config
    web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RPC_URL));;
    // minimum eth to swap
    ETH_AMOUNT = this.web3.utils.toWei('0.01', "Ether");
    ETH_SELL_PRICE = this.web3.utils.toWei('400', 'Ether');
    priceMonitor;
    monitoringPrice = false;
    // Contracts
    daiContract = new DaiContract();
    // Exchanges
    uniswapExchange = new UniswapExchange();
    kyberExchange = new KyberExchange();

    async sellEth(ethAmount, daiAmount) {
        const now = moment().unix();
        const DEADLINE = now + 60;
        const SETTINGS = {
            gasLimit: 1000000,
            gasPrice: this.web3.utils.toWei('5', 'Gwei'),
            //gas: "128028",
            //gasPrice: this.web3.utils.toWei("0.00000002", "ether"),
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

    async executeTrade() {
        // if (this.monitoringPrice) {
        //    return;
        //}
        // tslint:disable-next-line: no-console
        console.log("Checking price...");
        // this.monitoringPrice = true;

        try {
            // Check Eth Price
            const daiAmount = await this.uniswapExchange.uniswapExchange.methods.getEthToTokenInputPrice(this.ETH_AMOUNT).call();
            const price = this.web3.utils.fromWei(daiAmount.toString(), 'Ether');
            // tslint:disable-next-line: no-console
            console.log('Eth Price: ', price, ' DAI');
            // tslint:disable-next-line: no-console
            console.log('Dai amount: ', daiAmount);

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
                // clearInterval(this.priceMonitor)
            }

        } catch (err) {
            // tslint:disable-next-line: no-console
            console.error(err);
            // this.monitoringPrice = false;
            // clearInterval(this.priceMonitor);
            return;
        }

        // this.monitoringPrice = false;
    }

    async checkPair(args) {
        const {
            inputTokenSymbol,
            inputTokenAddress,
            outputTokenSymbol,
            outputTokenAddress,
            inputAmount
        } = args;

        let uniswapResult = await this.uniswapExchange.getUniswapReturn(outputTokenAddress, inputAmount);
        let kyberResult = await this.kyberExchange.kyberRateContract.methods.getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true).call()

        console.table([{
            'Input Token': inputTokenSymbol,
            'Output Token': outputTokenSymbol,
            'Input Amount': this.web3.utils.fromWei(inputAmount, 'Ether'),
            'Uniswap Return': this.web3.utils.fromWei(uniswapResult, 'Ether'),
            'Kyber Expected Rate': this.web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
            'Kyber Min Return': this.web3.utils.fromWei(kyberResult.slippageRate, 'Ether'),
            'Timestamp': moment().tz('America/Chicago').format(),
        }]);

        // TRADING LOGIC HERE
    }

    async monitorPrice() {
        if (this.monitoringPrice) {
            return
        }

        console.log("Checking prices...")
        this.monitoringPrice = true

        try {


            await this.checkPair({
                inputTokenSymbol: 'ETH',
                inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                outputTokenSymbol: 'MKR',
                outputTokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
                inputAmount: this.web3.utils.toWei('1', 'ETHER')
            });

            await this.checkPair({
                inputTokenSymbol: 'ETH',
                inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                outputTokenSymbol: 'DAI',
                outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
                inputAmount: this.web3.utils.toWei('1', 'ETHER')
            });

            await this.checkPair({
                inputTokenSymbol: 'ETH',
                inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                outputTokenSymbol: 'KNC',
                outputTokenAddress: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
                inputAmount: this.web3.utils.toWei('1', 'ETHER')
            });

            await this.checkPair({
                inputTokenSymbol: 'ETH',
                inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                outputTokenSymbol: 'LINK',
                outputTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
                inputAmount: this.web3.utils.toWei('1', 'ETHER')
            });

        } catch (error) {
            console.error(error)
            this.monitoringPrice = false
            clearInterval(this.priceMonitor)
            return
        }

        this.monitoringPrice = false
    }

}

export default ArbitrageBot;