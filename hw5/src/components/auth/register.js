import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

const newUserInfo = {
    accountName: '',
    displayName: '',
    email: '',
    phoneNum: '',
    dateOfBrith: '',
    zipCode: '',
    password: '',
    passwordConfirm: '',
}

const Register = ({info, setInfo, dispatch}) => {

    return(
        <div>
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    validate(setInfo, dispatch)
                    }}>
                <div className="info">
                    {info}
                </div>

                <div className='space' />

                <div className="form-group">
                    <label htmlFor="accountName" className="col-md-4 control-label">Account Name</label>
                    <div className="col-md-7">
                    <input type="text" className="form-control" id="accountName" placeholder="Account Name" required='required'
                        pattern="[a-z|A-Z][a-z|A-Z|\d]*" title="Account name contains digits and letters, but may not start with a digit"
                        ref={(node) => newUserInfo.accountName = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="displayName" className="col-md-4 control-label">Display Name</label>
                    <div className="col-md-7">
                    <input type="text" className="form-control" id="displayName" placeholder="Display Name" required='required'
                        pattern="[a-z|A-Z][a-z|A-Z|\d]*" title="Account name contains digits and letters, but may not start with a digit"
                        ref={(node) => newUserInfo.displayName = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="col-md-4 control-label">Email</label>
                    <div className="col-md-7">
                    <input type="email" className="form-control" id="email" placeholder="Email" required='required'
                        title="Please input a valid email address, for example, abc@def.com"
                        ref={(node) => newUserInfo.email = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNum" className="col-md-4 control-label">Phone Num</label>
                    <div className="col-md-7">
                    <input type="number" className="form-control" id="phoneNum" placeholder="Phone Number" required='required'
                        pattern="\d{3}-\d{3}-\d{4}" title="Please input a valid phone number, for example, 123-456-7890"
                        ref={(node) => newUserInfo.phoneNum = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth" className="col-md-4 control-label">Date of Birth</label>
                    <div className="col-md-7">
                    <input type="date" className="form-control" id="dateOfBirth" required='required'
                        ref={(node) => newUserInfo.dateOfBrith = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="zipcode" className="col-md-4 control-label">Zipcode</label>
                    <div className="col-md-7">
                    <input type="number" className="form-control" id="zipcode" placeholder="Zip Code" required='required'
                        min="10000" max="99999" title="Please input a valid Zipcode, for example, 77005" 
                        ref={(node) => newUserInfo.zipCode = node} />
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="inputPassword" className="col-md-4 control-label">Password</label>
                    <div className="col-md-7">
                    <input type="password" className="form-control" id="password" 
                        placeholder="Password" required='required'
                        ref={(node) => newUserInfo.password = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordConfirm" className="col-md-4 control-label">Password Again</label>
                    <div className="col-md-7">
                    <input type="password" className="form-control" id="passwordConfirm" 
                        placeholder="Password Confirmation" required='required'
                        ref={(node) => newUserInfo.passwordConfirm = node} />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" className="btn btn-info" value="Register" />
                </div>

            </form>
        </div>
    )
}

Register.propsType = {
    info: PropTypes.string.isRequired,
    setInfo: PropTypes.func.isRequired
}


const validate = (setInfo, dispatch) => {
    
    if(newUserInfo.password.value != newUserInfo.passwordConfirm.value) {
        setInfo('Passwords do not match')
        return
    }
    if((new Date().getFullYear() - Number(newUserInfo.dateOfBrith.value.substring(0,4))) < 18) {
        setInfo('You must be above 18 ages')
        return
    }
    dispatch(register({
        username: newUserInfo.accountName.value, 
        email: newUserInfo.email.value,
        dob: newUserInfo.dateOfBrith.value,
        zipcode: newUserInfo.zipCode.value,
        password: newUserInfo.password.value
    }))
}

export default connect(
    (state) => {
        return {
            info: state.registerInfo
        }
    }, 
    (dispatch) => {
        return {
            setInfo: (info) => dispatch({type: 'REGISTER_INFO', info}),
            dispatch: dispatch
        }
    }
)(Register)