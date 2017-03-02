import React from 'react'
import {connect} from 'react-redux'
import Nav from '../main/nav'


const profileWords = {
    accountName: 'Account Name',
    displayName: 'Display Name',
    email: 'Email Addredd',
    phoneNum: 'Phone Number',
    dateOfBirth: 'Date Of Birth',
    zipCode: 'Zip Code',
    password: 'Pass Word'
}

var userProfile = {
    displayName: '',
    email: '',
    phoneNum: '',
    zipCode: '',
    password: '',
    passwordConfirm: ''
}

const CurrentInfo = ({user}) => {
    var keys = Object.keys(user)
    return (
        <div className='currentInfo content'>
            <h3> Current Info </h3>
            <table className='table'>
                {keys.map((key, index) => {
                    if(new Set(['displayName','email','phoneNum','dateOfBirth','zipCode']).has(key)) {
                        return (
                            <tbody key={index}><tr>
                                <td>{profileWords[key]}</td>
                                <td>{user[key]}</td>
                            </tr></tbody>
                            )
                    }})
                }
            </table>
        </div>
    )
}

const UpdateInfo = ({user, info, setInfo, updateProfile}) => {
    return (
        <div className='updateInfo content'>
            <h3> Update Info </h3>
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    validate(setInfo, updateProfile)
                    }}>
                <div className='info'>
                    {info}
                </div>

                <div className='space' />

                <div className='form-group'>
                    <label htmlFor='displayName' className='col-md-4 control-label'>Display Name</label>
                    <div className='col-md-7'>
                    <input type='text' className='form-control' id='displayName' placeholder='Display Name' required='required'
                        pattern='[a-z|A-Z][a-z|A-Z|\d]*' title='Account name contains digits and letters, but may not start with a digit'
                        defaultValue={user.displayName}
                        ref={(node) => userProfile.displayName = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='email' className='col-md-4 control-label'>Email</label>
                    <div className='col-md-7'>
                    <input type='email' className='form-control' id='email' placeholder='Email' required='required'
                        title='Please input a valid email address, for example, abc@def.com' defaultValue={user.email}
                        ref={(node) => userProfile.email = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='phoneNum' className='col-md-4 control-label'>Phone Num</label>
                    <div className='col-md-7'>
                    <input type='number' className='form-control' id='phoneNum' placeholder='Phone Number' required='required'
                        pattern='\d{3}-\d{3}-\d{4}' title='Please input a valid phone number, for example, 123-456-7890' defaultValue={user.phoneNum}
                        ref={(node) => userProfile.phoneNum = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='zipcode' className='col-md-4 control-label'>Zipcode</label>
                    <div className='col-md-7'>
                    <input type='number' className='form-control' id='zipcode' placeholder='Zip Code' required='required'
                        min='10000' max='99999' title='Please input a valid Zipcode, for example, 77005' defaultValue={user.zipCode}
                        ref={(node) => userProfile.zipCode = node} />
                    </div>
                </div>
                
                <div className='form-group'>
                    <label htmlFor='inputpassword' className='col-md-4 control-label'>password</label>
                    <div className='col-md-7'>
                    <input type='password' className='form-control' id='password' defaultValue={user.password}
                        placeholder='password' required='required'
                        ref={(node) => userProfile.password = node} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordConfirm" className="col-md-4 control-label">password Again</label>
                    <div className="col-md-7">
                    <input type="password" className="form-control" id="passwordConfirm" 
                        placeholder="password Confirmation" required='required' defaultValue={user.password}
                        ref={(node) => userProfile.passwordConfirm = node} />
                    </div>
                </div>

                <div className='form-group'>
                    <input type='submit' className='btn btn-info' value='Register' />
                </div>
            </form>
        </div>
    )
}

const validate = (setInfo, updateProfile) => {
    if(userProfile.password.value != userProfile.passwordConfirm.value) {
        setInfo('passwords do not match')
        return
    }
    updateProfile({
        displayName: userProfile.displayName.value, 
        email: userProfile.email.value,
        phoneNum: userProfile.phoneNum.value,
        zipCode: userProfile.zipCode.value,
        password: userProfile.password.value
    })
}

export const Profile = ({user, info, setInfo, updateProfile}) => {
    return(
        <div>
            <Nav user={user} />
            <div className='container-fluid content'>
                <div className='row'>
                    <div className='col-md-4 col-md-offset-1 profileImg'>
                        <div className='row'>
                        <img src = 'http://www.downloadclipart.net/large/1509-cartoon-owl-design.png' alt='image' 
                            className='img-responsive center-block' id='profileImage' />
                        </div>
                        <div className='space' />
                        <div className='row'>
                            <label className='col-md-6'> Upload New Picture: </label> 
                            <input className='col-md-6'type='file' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <CurrentInfo user={user}/>
                </div>
                <div className='col-md-6'>
                    <UpdateInfo user={user} info={info} setInfo={setInfo} updateProfile={updateProfile}/>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user,
            info: state.updateInfo
        }
    }, 
    (dispatch) => {
        return {
            setInfo: (info) => dispatch({type: 'UPDATE_INFO', info}),
            updateProfile: (newProfile) => dispatch({type: 'UPDATE_PROFILE', newProfile})
        }
    }
)(Profile)
