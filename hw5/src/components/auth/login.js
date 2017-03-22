import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { login } from './authActions'

let userNameInput, passWordInput

const Login = ({info, setLoginInfo, dispatch}) => {
    return(
        <div>
            <form className='form-horizontal'>

                <div className="info">
                    {info}
                </div>

                <div className='space' />

                <div className='form-group'>
                    <label htmlFor='username' className='col-md-4 control-label'>Account Name</label>
                    <div className='col-md-7'>
                    <input type='text' className='form-control' id='username' placeholder='Account Name' 
                        ref={(node) => userNameInput = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='password' className='col-md-4 control-label'>Password</label>
                    <div className='col-md-7'>
                    <input type='password' className='form-control' id='password' placeholder='Password' 
                        ref={(node) => passWordInput = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <input type='submit' className='btn btn-success' onClick={(event) => {
                        event.preventDefault();
                        validate(setLoginInfo, dispatch)}
                    } value='Login' />
                </div>

            </form>
        </div>
    )
}

Login.propsType = {
    info: PropTypes.string.isRequired,
    setLoginInfo: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
}

const validate = (setLoginInfo, dispatch) => {

    if(userNameInput.value == '' || passWordInput.value == '') {
        dispatch({type: 'LOGIN_INFO', info: '*** Please input account name and password'})
        return
    }
    dispatch(login(({username: userNameInput.value, password: passWordInput.value})))
    
    userNameInput.value = ''
    passWordInput.value = ''
}

export default connect(
    (state) => {
        return {
            info: state.loginInfo
        }
    }, null)(Login)