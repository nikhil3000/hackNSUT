import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import App from './App';
import Poll from './Poll';
import Register from './Register'; 
import SubmitVote from './SubmitVote';
import QuestionsList from './QuestionsList';
import createHistory from 'history/createBrowserHistory';
import Web3Test from './web3';
import { root } from 'postcss';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';
import OrderBook from './OrderBook'
export const history = createHistory();



export default class Routers extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            factoryContractUport : undefined,
            web3: undefined
        }
    }
    componentWillMount()
    {
        var rpcURL = 'https://rinkeby.infura.io/v3/6b455d8a8338421b8e0e2db7d3264419';

        const connect = new Connect('VotingDapp', { 
                network: {
                    id:4,
                rpcUrl:rpcURL  }}
                    )
        const provider = connect.getProvider();
        const web3 = new Web3(provider);
        this.setState({web3:web3});
        const factoryContractUport = new web3.eth.Contract(JSON.parse(config.abi.factoryABI),config.contractAddresses.voterFactoryAddress);        
        this.setState({factoryContractUport:factoryContractUport});
    }
    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={App} exact={true} />
                        <Route path="/poll/:address" component={Poll}/>
                        <Route path="/register" render={()=> <Register history={history} factoryContractUport={this.state.factoryContractUport} />} />
                        <Route path="/submitVote" component={SubmitVote}/>
                        <Route path="/web3" component={Web3Test}/> 
                        <Route path="/questionslist" render={()=> <QuestionsList history={history} factoryContractUport={this.state.factoryContractUport} web3={this.state.web3} />} />
                        <Route path="/orderbook" component={OrderBook} />
                    </Switch>
                </Router>
            </div>
        );
    }
}