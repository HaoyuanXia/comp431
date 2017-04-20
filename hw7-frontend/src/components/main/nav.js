import React, {Component} from 'react'
import {connect} from 'react-redux'
import { resource } from '../../actions'

const Nav = ({editProfile, logout, toMain, location}) => {
    return(
        <div className='nav_bar'>
            <nav className='navbar navbar-inverse navbar-static-top'>
                <div className='navbar-header navbar-left'>
                    <a className='navbar-brand' href='#'>Ricebook</a>
                </div>

                <ul className="nav navbar-nav navbar-right">
                    {location == 'mainPage' ? (
                        <li><a onClick={() => editProfile()} href='#' id='toProfilePage'>Edit Profile</a></li>
                    ) : (
                        <li><a onClick={() => toMain()} href='#'>Main Page</a></li>
                    )}
                    <li><a onClick={() => logout()} href='#' id='logout'>Logout</a></li>
                </ul>
            </nav>
        </div>
    )
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
            logout: () => {
                resource('PUT', 'logout')
                .then((response) => {
                    dispatch({type: 'LOGOUT'})
                })
            },
            toMain: () => dispatch({type: 'TO_MAIN_PAGE'})
        }
    }
)(Nav)