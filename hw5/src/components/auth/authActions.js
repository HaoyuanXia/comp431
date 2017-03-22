import { resource } from '../../actions'
import { initArticles } from '../article/articleActions'
import { initFollowing } from '../main/followingActions'
import { initProfile } from '../profile/profileActions'

export const init = () => {
    return (dispatch) => {
        resource('GET', 'headlines')
        .then((response) => {
            dispatch({type: 'UPDATE_HEADLINE', username: response.headlines[0].username, 
                headline: response.headlines[0].headline})
            dispatch(initArticles())
            dispatch(initFollowing())
            dispatch(initProfile())
        })
    }
}

export const login = ({username, password}) => {
    return (dispatch) => {
        resource('POST', 'login', {username, password})
        .then((response) => {
            dispatch(init())
            dispatch({type: 'LOGIN', username: response.username})
        })
        
        .catch((error) => {
            console.log(error)
            dispatch({type: 'LOGIN_INFO', info: 'Error logging in as ' + username})
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        resource('PUT', 'logout') 
        .then(() => {
            dispatch({type: 'LOGOUT'})
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export const register = (data) => {
    return (dispatch) => {
        console.log(data)
        resource('POST', 'register', data)
        .then(dispatch({type: 'REGISTER'}))
        .then(dispatch({type: 'REGISTER_INFO', info: 'Register Success'}))
        .catch((error) => {
            console.log(error)
            dispatch({type: 'REGISTER_INFO', info: 'Fail to register'})
        })
    }
}