import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

const MAIN_PAGE = 'mainPage'
const PROFILE_PAGE = 'profilePage'
const LANDING_PAGE = 'landingPage'

export const App = ({location}) => {
    
    switch(location) {
        case MAIN_PAGE : return (<Main />)
        case PROFILE_PAGE : return (<Profile />)
        case LANDING_PAGE :
        default : return (<Landing />)
    }
}

App.propTypes = {
    location : PropTypes.string.isRequired
}

export default connect(
    (state) => {
        return {
            location : state.location
        }
    }, 
    (dispatch) => {
        return {
            //TODO
        }
    }
)(App)