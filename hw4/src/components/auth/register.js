import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'




var newUserInfo = {
    accountName: '',
    displayName: '',
    email: '',
    phoneNum: '',
    dateOfBrith: '',
    zipCode: '',
    password: '',
    passwordConfirm: '',
}

const Register = ({info, addUser}) => {

    return(
        <div>
            <form className='form-horizontal'>

                <div className="info">
                    {info}
                </div>

                <div className='space' />

                <div className="form-group">
                    <label htmlFor="accountName" className="col-md-4 control-label">Account Name</label>
                    <div className="col-md-7">
                    <input type="text" className="form-control" id="accountName" placeholder="Account Name" 
                        ref={(node) => newUserInfo.accountName = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="displayName" className="col-md-4 control-label">Display Name</label>
                    <div className="col-md-7">
                    <input type="text" className="form-control" id="displayName" placeholder="Display Name" 
                        ref={(node) => newUserInfo.displayName = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="col-md-4 control-label">Email</label>
                    <div className="col-md-7">
                    <input type="email" className="form-control" id="email" placeholder="Email" 
                        ref={(node) => newUserInfo.email = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNum" className="col-md-4 control-label">Phone Num</label>
                    <div className="col-md-7">
                    <input type="email" className="form-control" id="phoneNum" placeholder="Phone Number" 
                        ref={(node) => newUserInfo.phoneNum = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth" className="col-md-4 control-label">Date of Birth</label>
                    <div className="col-md-7">
                    <input type="date" className="form-control" id="dateOfBirth" 
                        ref={(node) => newUserInfo.dateOfBrith = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="zipcode" className="col-md-4 control-label">Zipcode</label>
                    <div className="col-md-7">
                    <input type="number" className="form-control" id="zipcode" placeholder="Zip Code" 
                        ref={(node) => newUserInfo.zipCode = node} />
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="inputPassword3" className="col-md-4 control-label">Password</label>
                    <div className="col-md-7">
                    <input type="password" className="form-control" id="password" placeholder="Password" 
                        ref={(node) => newUserInfo.password = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordConfirm" className="col-md-4 control-label">Password Again</label>
                    <div className="col-md-7">
                    <input type="password" className="form-control" id="passwordConfirm" placeholder="Password Confirmation" 
                        ref={(node) => newUserInfo.passwordConfirm = node} />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" className="btn btn-info" onSubmit={(event) => {
                        event.preventDefault();
                        validate(addUser)}
                    } value="Register" />
                </div>

            </form>
        </div>
    )
}

Register.propsType = {
    info: PropTypes.string.isRequired,
    addUser: PropTypes.func.isRequired
}


const validate = (addUser) => {

    var newUser = {
        accountName: newUserInfo.accountName.value,
        password: newUserInfo.password.value
    }

    addUser(newUser)
}

export default connect(
    (state) => {
        return {
            info: state.registerInfo
        }
    }, 
    (dispatch) => {
        return {
            addUser: (user) => dispatch({type: 'REGISTER', user})
        }
    }
)(Register)