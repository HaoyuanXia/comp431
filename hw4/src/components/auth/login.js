import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

var userInfo = {
    accountName: '',
    password: ''
}

const Login = ({userList, login, info, setLoginInfo}) => {
    return(
        <div>
            <form className='form-horizontal'>

                <div className="info">
                    {info}
                </div>

                <div className='space' />

                <div className='form-group'>
                    <label htmlFor='accountName' className='col-md-4 control-label'>Account Name</label>
                    <div className='col-md-7'>
                    <input type='text' className='form-control' id='accountName' placeholder='Account Name' 
                        ref={(node) => userInfo.accountName = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='passwordConfirm' className='col-md-4 control-label'>Password</label>
                    <div className='col-md-7'>
                    <input type='password' className='form-control' id='passwordConfirm' placeholder='Password' 
                        ref={(node) => userInfo.password = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <input type='submit' className='btn btn-success' onClick={(event) => {
                        event.preventDefault();
                        validate(userList, login, setLoginInfo)}
                    } value='Login' />
                </div>

            </form>
        </div>
    )
}

Login.propsType = {
    userList: PropTypes.arrayOf(PropTypes.shape({
        accountName: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired).isRequired,
    login: PropTypes.func.isRequired,
    loginInfo: PropTypes.string.isRequired,
    setLoginInfo: PropTypes.func.isRequired
}

const validate = (userList, login, setLoginInfo) => {
    if(userInfo.accountName.value == '' || userInfo.password.value == '') {
        setLoginInfo('*** Please input account name and password')
        return
    }
    /*
    userList.forEach((user) => {
        if(userInfo.accountName.value === user.accountName
            && userInfo.password.value === user.password) {
                login(user.accountName)
                setLoginInfo("Login Success")
                return
            }
    })
    */
    
    login(userInfo.accountName)

    userInfo.accountName.value = ''
    userInfo.password.value = ''
}

export default connect(
    (state) => {
        return {
            userList: state.userList,
            info: state.loginInfo
        }
    }, 
    (dispatch) => {
        return {
            login : (username) => dispatch({type:'LOGIN', username}),
            setLoginInfo: (info) => dispatch({type:'LOGIN_INFO', info})
        }
    }
)(Login)