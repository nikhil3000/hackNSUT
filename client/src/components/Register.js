import React from 'react';
import axios from 'axios';
import hash from 'object-hash';
import FlashMessage from 'react-flash-message'




var basURL = 'http://localhost:5000/';
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.emailOTP = this.emailOTP.bind(this);
        this.checkEmailOTP = this.checkEmailOTP.bind(this);
        this.SMSOTP = this.SMSOTP.bind(this);
        this.checkSMSOTP = this.checkSMSOTP.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.state = {
            email: undefined,
            number: undefined,
            smsOTPSent: false,
            emailOTPSent: false,
            emailAlreadyExists: false
        }
    }

    componentDidMount() {
    }
    emailOTP(e) {
        e.preventDefault();
        var email = $("#email")[0].value;
        axios.post(basURL + 'emailOTP', { email: email })
            .then(response => {
                if (response.data == 'sent') {
                    this.setState({ emailOTPSent: true });
                }
                else if (response.data == 'AlreadyExists') {
                    this.setState({ emailAlreadyExists: true })
                }
            })
            .catch(err => {
                // window.alert('some error occured');
                console.log(err);
            })
    }

    checkEmailOTP(e) {
        e.preventDefault();
        console.log("checkEmailOTP");
        var email = $("#email")[0].value;
        var emailOTP = $("#emailOTP")[0].value;
        axios.post(basURL + 'checkEmailOTP', { email: email, emailOTP: emailOTP })
            .then(response => {
                console.log(response);
                switch (response.data) {
                    case "AlreadyExists":
                        console.log('already exists');
                        this.setState({ emailAlreadyExists: true });
                        break;
                    case 'CorrectOTP': this.setState({ email: email });
                        break;
                    case 'OTPObjNotFound': console.log('incorrect');
                        break;
                    default: console.log('default')
                }

                // var result = response.body;
                // if (result) {
                //     window.alert("otp verified");
                //     this.setState({
                //         email: email
                //     })
                // }
                // else {
                //     window.alert("otp invalid");
                // }
            })
            .catch(err => {
                // window.alert('some error occured');
                console.log(err);
            })
    }

    SMSOTP(e) {
        e.preventDefault();
        var number = $("#mobile")[0].value;
        console.log(number);
        axios.post(basURL + 'smsOTP', { number: number })
            .then(response => {

            })
            .catch(err => {
                // window.alert('some error occured');
                console.log(err);
            })
    }

    checkSMSOTP(e) {
        e.preventDefault();
        var number = $("#mobile")[0].value;
        var mobileOTP = $("#SMSotp")[0].value;
        console.log(number);
        console.log(mobileOTP);
        var obj = { number: number, mobileOTP: mobileOTP }
        axios.post(basURL + 'checkSMSotp', obj)
            .then(response => {
                console.log(response);
                var result = response.body;
                if (result) {
                    window.alert("otp verified");
                    this.setState({
                        email: email
                    })
                }
                else {
                    window.alert("otp invalid");
                }
            })
            .catch(err => {
                // window.alert('some error occured');
                console.log(err);
            })
    }

    registerUser(e) {

        e.preventDefault();
        var passkey = $("#passKey")[0].value;
        console.log(passkey);
        if (this.state.number && this.state.email) {
            var preHash = this.state.number.toString() + this.state.email.toString() + passkey.toString();
            var hashedString = hash(preHash);
            axios.post(basURL + 'addVoter', { hashedString: hashedString }, (response) => {
                console.log(response);
                this.props.history.push('/questionslist');

            })
        }
        else {
            axios.post(basURL + 'addVoter', { hashedString: 'abcdef' }).then(response => {
                console.log("response", response);
            });
        }
    }



    render() {
        return (
            <div>
                {this.state.emailAlreadyExists && <FlashMessage duration={5000}>
                    <strong>Email already used</strong>
                </FlashMessage>
                }
                <div className="card register">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter your email"></input>
                                        </div>
                                        <div className="col-sm-2">
                                            {
                                                this.state.emailOTPSent ?
                                                    <button className="btn btn-info" onClick={this.emailOTP}>Resend OTP</button>
                                                    : <button className="btn btn-primary" onClick={this.emailOTP}>Send OTP</button>
                                            }
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" name="Emailotp" id="emailOTP" placeholder="Email OTP"></input>
                                        </div>
                                        <div className="col-sm-2">
                                            {
                                                !this.state.email && <button className="btn btn-primary" onClick={this.checkEmailOTP}>Submit OTP</button>
                                            }
                                            {
                                                this.state.email && <i className="fas fa-check" style={{ color: '#008000' }}>Verified</i>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Mobile number</label>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="Enter your Mobile Number"></input>
                                        </div>
                                        <div className="col-sm-2">
                                            {this.state.smsOTPSent ?
                                                <button className="btn btn-info" onClick={this.SMSOTP}>Resend OTP</button>
                                                : <button className="btn btn-primary" onClick={this.SMSOTP}>Send OTP</button>
                                            }
                                        </div>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control" name="SMSotp" id="SMSotp" placeholder="Mobile OTP"></input>
                                        </div>
                                        <div className="col-sm-2">
                                            {
                                                !this.state.number && <button className="btn btn-primary" onClick={this.checkSMSOTP}>Submit OTP</button>
                                            }
                                            {
                                                this.state.number && <i className="fas fa-check" style={{ color: '#008000' }}>Verified</i>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">PassKey</label>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" name="passkey" id="passKey" placeholder="Enter your secret key"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10"></div>
                                        <div className="col-sm-2">
                                            <button className="btn-lg btn-success" onClick={this.registerUser}>Register</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
{/* <input type="text" class="form-control otp" name="otp" placeholder="Check your inbox for OTP"></input> */ }



