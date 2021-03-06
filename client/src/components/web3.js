import React from 'react';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';

export default class Web3Test extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreateOption = this.handleCreateOption.bind(this);
        this.relocateToOrderBook = this.handleCreateOption.bind(this);
        this.state = {
            optionAddress: undefined,
            ethAddress: undefined
        };
    }

    handleCreateOption(e) {
        e.preventDefault();
        let ethAddress;
        web3 = new Web3(web3.currentProvider);
        console.log(web3);
        const factoryABI = [{ "constant": true, "inputs": [], "name": "getOrgAccount", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_baseToken", "type": "address" }, { "name": "_quoteToken", "type": "address" }, { "name": "_strikePrice", "type": "uint256" }], "name": "createNewOption", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newFee", "type": "uint256" }], "name": "changeNewOptionFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_orgAddress", "type": "address" }], "name": "setOrgAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOptionFee", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "wandTokenAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_storageAddress", "type": "address" }, { "name": "_tokenAddress", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_baseToken", "type": "address" }, { "indexed": false, "name": "_quoteToken", "type": "address" }, { "indexed": false, "name": "_optionAddress", "type": "address" }, { "indexed": true, "name": "_creator", "type": "address" }], "name": "LogOptionCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }], "name": "OwnershipRenounced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }];
        const factoryaddress = '0x81afd58f37d88063276ac933bb9b67351621704e';
        const factoryContract = new web3.eth.Contract(factoryABI, factoryaddress);

        web3.eth.getAccounts((err, address) => {
            console.log(address[0]);
            ethAddress = address[0];
            factoryContract.methods.createNewOption("0x8a2e0dfc9baa42ba1c92dc1f77a5cec7407afa42", "0xb9d22e4f9683cf9fc3f41abb1fb001252438bae8", "50")
                .send({ from: address[0] }, (err, hash) => {
                    console.log(err);
                    console.log(hash)
                })
        })

        factoryContract.once('LogOptionCreated', { fromBlock: 0 }, (err, log) => {
            console.log(err);
            console.log('call');
            const optionAddress = log.returnValues[2];
            console.log(optionAddress);
            if (optionAddress != this.state.optionAddress) {
                this.setState({ optionAddress: optionAddress });
                var tokenFaucetABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }, { "name": "_recipient", "type": "address" }], "name": "getTokens", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];
                var faucetAddress = '0xb9d22e4f9683cf9fc3f41abb1fb001252438bae8';
                const faucetContract = new web3.eth.Contract(tokenFaucetABI, faucetAddress);

                const optionAbi = [{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isOptionIssued", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOptionDetails", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "quoteToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_assetsOffered", "type": "uint256" }, { "name": "_premium", "type": "uint256" }, { "name": "_expiry", "type": "uint256" }], "name": "issueOption", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }], "name": "decreaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "buyer", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenProxy", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawTokens", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "optionDumperAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "tradeOption", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "strikePrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "baseToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_extraOffering", "type": "uint256" }], "name": "incOffering", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }], "name": "increaseApproval", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "premium", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "expiry", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "exerciseOption", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "Traders", "outputs": [{ "name": "optionQuantity", "type": "uint256" }, { "name": "status", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_baseToken", "type": "address" }, { "name": "_quoteToken", "type": "address" }, { "name": "_strikePrice", "type": "uint256" }, { "name": "_buyer", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_optionsIssued", "type": "uint256" }, { "indexed": false, "name": "_expirationTime", "type": "uint256" }, { "indexed": false, "name": "_premium", "type": "uint256" }, { "indexed": false, "name": "_tokenProxy", "type": "address" }], "name": "LogOptionsIssued", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_trader", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }, { "indexed": false, "name": "_timestamp", "type": "uint256" }], "name": "LogOptionsTrade", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_trader", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }, { "indexed": false, "name": "_timestamp", "type": "uint256" }], "name": "LogOptionsExcercised", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];
                const optionContract = new web3.eth.Contract(optionAbi, optionAddress);

                optionContract.methods.strikePrice().call({ from: ethAddress }, (err, strikePrice) => {
                    console.log('strike price', strikePrice);
                    faucetContract.methods.approve(optionAddress, 1000000 * strikePrice).send({ from: ethAddress }, (err, approved) => {
                        if (approved) {
                            optionContract.methods.issueOption(10, 5, 4223785)
                                .send({ from: ethAddress }, (err, hash) => {
                                    console.log('option issued', hash);
                                })
                        }
                    })
                })

            }
        })
    }

    relocateToOrderBook()
    {
        console.log('relocate');
        window.location = "file:///home/nikhil3000/hack-nsut/index.html";
    }



    render() {
        return (
            <div>
                <div className="sidenav">
                    <div className="sidenav-content">
                        <h1 style={{fontWeight:800,fontSize:'2.3em',padding:'0 18%'}}>Eth Option</h1>
                        <ul style={{padding:0}}>
                            <li>
                                <a href="index.html" >Order Book</a>
                            </li>
                            <li>
                                <a href="#" >Order Fill</a>
                            </li>
                            <li>
                                <a href="history.html">Order History</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="main e" >
                    <div className="card d" >
                        <div className="card-header blue">
                            <span>Some Random Form</span>
                        </div>
                        <div className="booking-form">
                            <form className="f">
                                <div className="a">Enter Base Token</div><input type="text" className="input-form" placeholder="........................." name="base_token" />
                                <div className="b">Enter Quote Token</div><input type="text" className="input-form" placeholder="........................." name="quote_token" />
                                <div className="c">Enter Strike Price</div><input type="text" className="input-form" placeholder="........................." name="strike_price" />
                                <br />
                                <input type="submit" className="submit-btn" value="Create Option" onClick={this.handleCreateOption}/>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}



// componentDidMount() {

    // const connect = new Connect('Test Web3', { network: 'rinkeby' })
    // const provider = connect.getProvider()
    // const web3 = new Web3(provider)
    // const abi = [{ "constant": false, "inputs": [{ "name": "_num", "type": "uint256" }], "name": "setNum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "getNum", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
    // const statusContract = new web3.eth.Contract(JSON.parse(config.abi.factoryABI),config.contractAddresses.voterFactoryAddress);

    // // statusContract.methods.createPoll("Question uport?").send({from:'0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087'},(err,hash)=>{
    // //     if(err) {throw err};
    // //     console.log(hash);
    // // })



//     let web3;
//     if (web3 && web3.currentProvider) {
//         const factoryContract = web3.eth.contract(JSON.parse(config.abi.factoryABI));
//         const factory = factoryContract.at(config.contractAddresses.voterFactoryAddress);
//         factory.createPoll("Question 1?", function (err, result) {
//             if (!err) {
//                 console.log("poll result", result);
//             }
//             else
//                 console.log(err);
//         });

//         factory.getStorageContract(function (err, result) {
//             if (err)
//                 console.log(err);
//             else {
//                 console.log(result);
//             }
//         });

//     }
//     else {
//         // console.log("metamask web 3 not found fallback to uport");
//         const connect = new Connect('VotingDapp2', { network: 'rinkeby' });

//         // const txObj = {
//         //     address: '0x5942763146abECF6ADC72619eD9b619df8b2412E',
//         //     value: 10000000000  
//         //   }
//         //   connect.sendTransaction(txObj, 'ethSendReq')
//         //   connect.onResponse('ethSendReq').then(res => {
//         //     console.log(res);
//         //   })



//         const provider = connect.getProvider()
//         const web3 = new Web3(provider)
//         const factory = web3.eth.Contract(JSON.parse(config.abi.factoryABI),config.contractAddresses.voterFactoryAddress);
//         // const factory = factoryContract
//         factory.methods.createPoll("Question 1?", function (err, result) {
//             if (!err) {
//                 console.log("poll result", result);
//             }
//             else
//                 console.log(err);
//         });



//         // connect.requestDisclosure();
//         // connect.onResponse('disclosureReq').then(res => {
//         //     console.log(res);
//         //     const did = res.payload.did
//         // })
//         const factory = connect.contract(JSON.parse(config.abi.factoryABI)).at(config.contractAddresses.voterFactoryAddress);
//         const abi = [ { "constant": false, "inputs": [ { "name": "_num", "type": "uint256" } ], "name": "setNum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "getNum", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
//         const statusContract = connect.contract(abi).at("0x5573b56dd293552f449db7482833a68f7b5f9062");
//         statusContract.setNum(5,'id1');
//         connect.onResponse('id1').then(res => {
//             const txId = res.payload
//           })


//         // const reqid = 'createPoll';
//         // console.log(factory);
//         // factory.createPoll('Question 2?', reqid);

//         // connect.onResponse(reqid).then(req => {
//         //     console.log(req);
//         // })
//     }
// }
