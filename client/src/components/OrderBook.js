import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';
// this.props.history.push('/form2');

var basURL = 'http://localhost:5000/';
export default class OrderBook extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        axios.get(basURL+'getData')
        .then(response=>{
            console.log(response);
        })   
        .catch(err=>{
            console.log(err);
        })
    }


    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Question</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data && this.state.data.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.question}</td>
                                    {/* <td>{data.count}</td> */}
                                    <td><button className="btn btn-primary" onClick={(e)=>this.handleClick(data.questionsAddress,e)}>Vote</button></td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}