import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const Nav = ({editProfile, logout, toMain, location}) => {
    return(
        <div className='nav_bar'>
            <nav className='navbar navbar-inverse navbar-static-top'>
                <div className='navbar-header navbar-left'>
                    <a className='navbar-brand' href='#'>Ricebook</a>
                </div>

                <ul className="nav navbar-nav navbar-right">
                    {location == 'mainPage' ? (
                        <li><a onClick={() => editProfile()} href='#'>Edit Profile</a></li>
                    ) : (
                        <li><a onClick={() => toMain()} href='#'>Main Page</a></li>
                    )}
                    <li><a onClick={() => logout()} href='#'>Logout</a></li>
                </ul>
            </nav>
        </div>
    )
}

Nav.propsType= {
    editProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            location: state.location
        }
    },
    (dispatch) => {
        return {
            editProfile: () => dispatch({type: 'TO_PROFILE_PAGE'}),
            logout: () => dispatch({type: 'LOGOUT'}),
            toMain: () => dispatch({type: 'LOGIN'})
        }
    }
)(Nav)