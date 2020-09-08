require('dotenv').config();
import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider';

class UniswapExchange {

    // Web3 Config
    web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RPC_URL));

    // Uniswap Factory Configs
    UNISWAP_FACTORY_ABI = [{
        "name": "NewExchange",
        "inputs": [{
          "type": "address",
          "name": "token",
          "indexed": true
        }, {
          "type": "address",
          "name": "exchange",
          "indexed": true
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "initializeFactory",
        "outputs": [],
        "inputs": [{
          "type": "address",
          "name": "template"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 35725
      }, {
        "name": "createExchange",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "token"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 187911
      }, {
        "name": "getExchange",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "token"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 715
      }, {
        "name": "getToken",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "exchange"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 745
      }, {
        "name": "getTokenWithId",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "token_id"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 736
      }, {
        "name": "exchangeTemplate",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 633
      }, {
        "name": "tokenCount",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 663
      }]
    UNISWAP_FACTORY_ADDRESS = '0xc0a47dfe034b400b47bdad5fecda2621de6c4d95'
    uniswapFactoryContract = new this.web3.eth.Contract(this.UNISWAP_FACTORY_ABI, this.UNISWAP_FACTORY_ADDRESS);
    UNISWAP_EXCHANGE_ABI = [{
        "name": "TokenPurchase",
        "inputs": [{
          "type": "address",
          "name": "buyer",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "eth_sold",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "tokens_bought",
          "indexed": true
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "EthPurchase",
        "inputs": [{
          "type": "address",
          "name": "buyer",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "tokens_sold",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "eth_bought",
          "indexed": true
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "AddLiquidity",
        "inputs": [{
          "type": "address",
          "name": "provider",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "eth_amount",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "token_amount",
          "indexed": true
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "RemoveLiquidity",
        "inputs": [{
          "type": "address",
          "name": "provider",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "eth_amount",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "token_amount",
          "indexed": true
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "Transfer",
        "inputs": [{
          "type": "address",
          "name": "_from",
          "indexed": true
        }, {
          "type": "address",
          "name": "_to",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "_value",
          "indexed": false
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "Approval",
        "inputs": [{
          "type": "address",
          "name": "_owner",
          "indexed": true
        }, {
          "type": "address",
          "name": "_spender",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "_value",
          "indexed": false
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "setup",
        "outputs": [],
        "inputs": [{
          "type": "address",
          "name": "token_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 175875
      }, {
        "name": "addLiquidity",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "min_liquidity"
        }, {
          "type": "uint256",
          "name": "max_tokens"
        }, {
          "type": "uint256",
          "name": "deadline"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 82616
      }, {
        "name": "removeLiquidity",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }, {
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "amount"
        }, {
          "type": "uint256",
          "name": "min_eth"
        }, {
          "type": "uint256",
          "name": "min_tokens"
        }, {
          "type": "uint256",
          "name": "deadline"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 116814
      }, {
        "name": "__default__",
        "outputs": [],
        "inputs": [],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "ethToTokenSwapInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "min_tokens"
        }, {
          "type": "uint256",
          "name": "deadline"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 12757
      }, {
        "name": "ethToTokenTransferInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "min_tokens"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 12965
      }, {
        "name": "ethToTokenSwapOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }, {
          "type": "uint256",
          "name": "deadline"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 50463
      }, {
        "name": "ethToTokenTransferOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 50671
      }, {
        "name": "tokenToEthSwapInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }, {
          "type": "uint256",
          "name": "min_eth"
        }, {
          "type": "uint256",
          "name": "deadline"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 47503
      }, {
        "name": "tokenToEthTransferInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }, {
          "type": "uint256",
          "name": "min_eth"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 47712
      }, {
        "name": "tokenToEthSwapOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "eth_bought"
        }, {
          "type": "uint256",
          "name": "max_tokens"
        }, {
          "type": "uint256",
          "name": "deadline"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 50175
      }, {
        "name": "tokenToEthTransferOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "eth_bought"
        }, {
          "type": "uint256",
          "name": "max_tokens"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 50384
      }, {
        "name": "tokenToTokenSwapInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }, {
          "type": "uint256",
          "name": "min_tokens_bought"
        }, {
          "type": "uint256",
          "name": "min_eth_bought"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "token_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 51007
      }, {
        "name": "tokenToTokenTransferInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }, {
          "type": "uint256",
          "name": "min_tokens_bought"
        }, {
          "type": "uint256",
          "name": "min_eth_bought"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }, {
          "type": "address",
          "name": "token_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 51098
      }, {
        "name": "tokenToTokenSwapOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }, {
          "type": "uint256",
          "name": "max_tokens_sold"
        }, {
          "type": "uint256",
          "name": "max_eth_sold"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "token_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 54928
      }, {
        "name": "tokenToTokenTransferOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }, {
          "type": "uint256",
          "name": "max_tokens_sold"
        }, {
          "type": "uint256",
          "name": "max_eth_sold"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }, {
          "type": "address",
          "name": "token_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 55019
      }, {
        "name": "tokenToExchangeSwapInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }, {
          "type": "uint256",
          "name": "min_tokens_bought"
        }, {
          "type": "uint256",
          "name": "min_eth_bought"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "exchange_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 49342
      }, {
        "name": "tokenToExchangeTransferInput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }, {
          "type": "uint256",
          "name": "min_tokens_bought"
        }, {
          "type": "uint256",
          "name": "min_eth_bought"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }, {
          "type": "address",
          "name": "exchange_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 49532
      }, {
        "name": "tokenToExchangeSwapOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }, {
          "type": "uint256",
          "name": "max_tokens_sold"
        }, {
          "type": "uint256",
          "name": "max_eth_sold"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "exchange_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 53233
      }, {
        "name": "tokenToExchangeTransferOutput",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }, {
          "type": "uint256",
          "name": "max_tokens_sold"
        }, {
          "type": "uint256",
          "name": "max_eth_sold"
        }, {
          "type": "uint256",
          "name": "deadline"
        }, {
          "type": "address",
          "name": "recipient"
        }, {
          "type": "address",
          "name": "exchange_addr"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 53423
      }, {
        "name": "getEthToTokenInputPrice",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "eth_sold"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 5542
      }, {
        "name": "getEthToTokenOutputPrice",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_bought"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 6872
      }, {
        "name": "getTokenToEthInputPrice",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "tokens_sold"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 5637
      }, {
        "name": "getTokenToEthOutputPrice",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "eth_bought"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 6897
      }, {
        "name": "tokenAddress",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1413
      }, {
        "name": "factoryAddress",
        "outputs": [{
          "type": "address",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1443
      }, {
        "name": "balanceOf",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "_owner"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1645
      }, {
        "name": "transfer",
        "outputs": [{
          "type": "bool",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "_to"
        }, {
          "type": "uint256",
          "name": "_value"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 75034
      }, {
        "name": "transferFrom",
        "outputs": [{
          "type": "bool",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "_from"
        }, {
          "type": "address",
          "name": "_to"
        }, {
          "type": "uint256",
          "name": "_value"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 110907
      }, {
        "name": "approve",
        "outputs": [{
          "type": "bool",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "_spender"
        }, {
          "type": "uint256",
          "name": "_value"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 38769
      }, {
        "name": "allowance",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "_owner"
        }, {
          "type": "address",
          "name": "_spender"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1925
      }, {
        "name": "name",
        "outputs": [{
          "type": "bytes32",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1623
      }, {
        "name": "symbol",
        "outputs": [{
          "type": "bytes32",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1653
      }, {
        "name": "decimals",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1683
      }, {
        "name": "totalSupply",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1713
      }];

    // Ropsten Adress Uniswap
    EXCHANGE_ADDRESS = '0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0';
    // Ropsten Uniswap Dai Exchange: https://ropsten.etherscan.io/address/0xc0fc958f7108be4060F33a699a92d3ea49b0B5f0

    // EXCHANGE_ABI = [{
    //         name: 'TokenPurchase',
    //         inputs: [{
    //                 type: 'address',
    //                 name: 'buyer',
    //                 indexed: !0
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'eth_sold',
    //                 indexed: !0
    //             }, {
    //                 type: 'uint256',
    //                 name: 'tokens_bought',
    //                 indexed: !0
    //             }
    //         ],
    //         anonymous: !1,
    //         type: 'event'
    //     }, {
    //         name: 'EthPurchase',
    //         inputs: [{
    //                 type: 'address',
    //                 name: 'buyer',
    //                 indexed: !0
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'tokens_sold',
    //                 indexed: !0
    //             }, {
    //                 type: 'uint256',
    //                 name: 'eth_bought',
    //                 indexed: !0
    //             }
    //         ],
    //         anonymous: !1,
    //         type: 'event'
    //     }, {
    //         name: 'AddLiquidity',
    //         inputs: [{
    //                 type: 'address',
    //                 name: 'provider',
    //                 indexed: !0
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'eth_amount',
    //                 indexed: !0
    //             }, {
    //                 type: 'uint256',
    //                 name: 'token_amount',
    //                 indexed: !0
    //             }
    //         ],
    //         anonymous: !1,
    //         type: 'event'
    //     }, {
    //         name: 'RemoveLiquidity',
    //         inputs: [{
    //                 type: 'address',
    //                 name: 'provider',
    //                 indexed: !0
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'eth_amount',
    //                 indexed: !0
    //             }, {
    //                 type: 'uint256',
    //                 name: 'token_amount',
    //                 indexed: !0
    //             }
    //         ],
    //         anonymous: !1,
    //         type: 'event'
    //     },
    //     {
    //         name: 'Transfer',
    //         inputs: [{
    //                 type: 'address',
    //                 name: '_from',
    //                 indexed: !0
    //             }, {
    //                 type: 'address',
    //                 name: '_to',
    //                 indexed: !0
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: '_value',
    //                 indexed: !1
    //             }
    //         ],
    //         anonymous: !1,
    //         type: 'event'
    //     }, {
    //         name: 'Approval',
    //         inputs: [{
    //                 type: 'address',
    //                 name: '_owner',
    //                 indexed: !0
    //             }, {
    //                 type: 'address',
    //                 name: '_spender',
    //                 indexed: !0
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: '_value',
    //                 indexed: !1
    //             }
    //         ],
    //         anonymous: !1,
    //         type: 'event'
    //     }, {
    //         name: 'setup',
    //         outputs: [],
    //         inputs: [{
    //             type: 'address',
    //             name: 'token_addr'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 175875
    //     },
    //     {
    //         name: 'addLiquidity',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'min_liquidity'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'max_tokens'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !0,
    //         type: 'function',
    //         gas: 82605
    //     }, {
    //         name: 'removeLiquidity',
    //         outputs: [{
    //                 type: 'uint256',
    //                 name: 'out'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'out'
    //             }
    //         ],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'amount'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_eth'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_tokens'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 116814
    //     }, {
    //         name: '__default__',
    //         outputs: [],
    //         inputs: [],
    //         constant: !1,
    //         payable: !0,
    //         type: 'function'
    //     }, {
    //         name: 'ethToTokenSwapInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'min_tokens'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !0,
    //         type: 'function',
    //         gas: 12757
    //     }, {
    //         name: 'ethToTokenTransferInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'min_tokens'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'recipient'
    //         }],
    //         constant: !1,
    //         payable: !0,
    //         type: 'function',
    //         gas: 12965
    //     },
    //     {
    //         name: 'ethToTokenSwapOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }],
    //         constant: !1,
    //         payable: !0,
    //         type: 'function',
    //         gas: 50455
    //     }, {
    //         name: 'ethToTokenTransferOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'recipient'
    //         }],
    //         constant: !1,
    //         payable: !0,
    //         type: 'function',
    //         gas: 50663
    //     }, {
    //         name: 'tokenToEthSwapInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'min_eth'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 47503
    //     }, {
    //         name: 'tokenToEthTransferInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'tokens_sold'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_eth'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             },
    //             {
    //                 type: 'address',
    //                 name: 'recipient'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 47712
    //     }, {
    //         name: 'tokenToEthSwapOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'eth_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'max_tokens'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 50175
    //     }, {
    //         name: 'tokenToEthTransferOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'eth_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'max_tokens'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'recipient'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 50384
    //     }, {
    //         name: 'tokenToTokenSwapInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'min_tokens_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'min_eth_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'token_addr'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 51007
    //     }, {
    //         name: 'tokenToTokenTransferInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'min_tokens_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'min_eth_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'recipient'
    //         }, {
    //             type: 'address',
    //             name: 'token_addr'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 51098
    //     }, {
    //         name: 'tokenToTokenSwapOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'max_tokens_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'max_eth_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'token_addr'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 54928
    //     }, {
    //         name: 'tokenToTokenTransferOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'tokens_bought'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'max_tokens_sold'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'max_eth_sold'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }, {
    //                 type: 'address',
    //                 name: 'recipient'
    //             }, {
    //                 type: 'address',
    //                 name: 'token_addr'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 55019
    //     },
    //     {
    //         name: 'tokenToExchangeSwapInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'tokens_sold'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_tokens_bought'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_eth_bought'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }, {
    //                 type: 'address',
    //                 name: 'exchange_addr'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 49342
    //     }, {
    //         name: 'tokenToExchangeTransferInput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'tokens_sold'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_tokens_bought'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'min_eth_bought'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }, {
    //                 type: 'address',
    //                 name: 'recipient'
    //             }, {
    //                 type: 'address',
    //                 name: 'exchange_addr'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 49532
    //     },
    //     {
    //         name: 'tokenToExchangeSwapOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //                 type: 'uint256',
    //                 name: 'tokens_bought'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'max_tokens_sold'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: 'max_eth_sold'
    //             }, {
    //                 type: 'uint256',
    //                 name: 'deadline'
    //             }, {
    //                 type: 'address',
    //                 name: 'exchange_addr'
    //             }
    //         ],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 53233
    //     }, {
    //         name: 'tokenToExchangeTransferOutput',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_bought'
    //         }, {
    //             type: 'uint256',
    //             name: 'max_tokens_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'max_eth_sold'
    //         }, {
    //             type: 'uint256',
    //             name: 'deadline'
    //         }, {
    //             type: 'address',
    //             name: 'recipient'
    //         }, {
    //             type: 'address',
    //             name: 'exchange_addr'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 53423
    //     }, {
    //         name: 'getEthToTokenInputPrice',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'eth_sold'
    //         }],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 5542
    //     }, {
    //         name: 'getEthToTokenOutputPrice',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_bought'
    //         }],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 6872
    //     }, {
    //         name: 'getTokenToEthInputPrice',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'tokens_sold'
    //         }],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 5637
    //     }, {
    //         name: 'getTokenToEthOutputPrice',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'uint256',
    //             name: 'eth_bought'
    //         }],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 6897
    //     }, {
    //         name: 'tokenAddress',
    //         outputs: [{
    //             type: 'address',
    //             name: 'out'
    //         }],
    //         inputs: [],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1413
    //     }, {
    //         name: 'factoryAddress',
    //         outputs: [{
    //             type: 'address',
    //             name: 'out'
    //         }],
    //         inputs: [],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1443
    //     }, {
    //         name: 'balanceOf',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'address',
    //             name: '_owner'
    //         }],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1645
    //     }, {
    //         name: 'transfer',
    //         outputs: [{
    //             type: 'bool',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'address',
    //             name: '_to'
    //         }, {
    //             type: 'uint256',
    //             name: '_value'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 75034
    //     }, {
    //         name: 'transferFrom',
    //         outputs: [{
    //             type: 'bool',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'address',
    //             name: '_from'
    //         }, {
    //             type: 'address',
    //             name: '_to'
    //         }, {
    //             type: 'uint256',
    //             name: '_value'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 110907
    //     }, {
    //         name: 'approve',
    //         outputs: [{
    //             type: 'bool',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'address',
    //             name: '_spender'
    //         }, {
    //             type: 'uint256',
    //             name: '_value'
    //         }],
    //         constant: !1,
    //         payable: !1,
    //         type: 'function',
    //         gas: 38769
    //     }, {
    //         name: 'allowance',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [{
    //             type: 'address',
    //             name: '_owner'
    //         }, {
    //             type: 'address',
    //             name: '_spender'
    //         }],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1925
    //     }, {
    //         name: 'name',
    //         outputs: [{
    //             type: 'bytes32',
    //             name: 'out'
    //         }],
    //         inputs: [],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1623
    //     }, {
    //         name: 'symbol',
    //         outputs: [{
    //             type: 'bytes32',
    //             name: 'out'
    //         }],
    //         inputs: [],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1653
    //     }, {
    //         name: 'decimals',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1683
    //     }, {
    //         name: 'totalSupply',
    //         outputs: [{
    //             type: 'uint256',
    //             name: 'out'
    //         }],
    //         inputs: [],
    //         constant: !0,
    //         payable: !1,
    //         type: 'function',
    //         gas: 1713
    //     }
    // ];

    async getUniswapReturn(exchangeAdress, inputAmount){
        console.log(exchangeAdress);
        let exchangeAddress = await this.uniswapFactoryContract.methods.getExchange(exchangeAdress).call()
        let uniswapExchange = new this.web3.eth.Contract(this.UNISWAP_EXCHANGE_ABI, exchangeAddress);
        let uniswapResult = await uniswapExchange.methods.getEthToTokenInputPrice(inputAmount).call()
        return uniswapResult;
    }
    
}

export default UniswapExchange;