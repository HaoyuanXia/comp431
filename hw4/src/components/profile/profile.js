import React from 'react'
import {connect} from 'react-redux'
import Nav from '../main/nav'


const profileWords = {
    accountName: "Account Name",
    password: "Pass Word"
}


const CurrentInfo = ({user}) => {
    var keys = Object.keys(user)
    return (
        <div className='currentInfo content'>
            <h3> Current Info </h3>
            <table className='table'>
                {keys.map((key, index) => {
                    return (
                        <tbody key={index}><tr>
                            <td>{profileWords[key]}</td>
                            <td>{user[key]}</td>
                        </tr></tbody>
                        )
                    })
                }
            </table>
        </div>
    )
}

const UpdateInfo = ({user}) => {
    return (
        <div className='updateInfo content'>
            <h3> Update Info </h3>
        </div>
    )
}

export const Profile = ({user}) => {
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
                    <UpdateInfo user={user}/>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user
        }
    }, 
    (dispatch) => {
        return {

        }
    }
)(Profile)
