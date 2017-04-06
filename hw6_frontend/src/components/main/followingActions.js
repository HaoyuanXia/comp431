import { resource } from '../../actions'
import { initArticles } from '../article/articleActions'

export const initFollowing = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_FOLLOWING'})
        resource('GET', 'following')
        .then((response) => {
            response.following.map(function(user)  {
                dispatch(displayFollowing(user))         
            }) 
        })
        .catch((error) => console.log(error))
    }
}

export const addFollowing = (name) => {
    return (dispatch) => {
        resource('PUT', 'following/' + name)
        .then((response) => {
            dispatch(initFollowing())
            dispatch(initArticles())
        })     
    }
}

export const removeFollowing = (name) => {
    return (dispatch) => {
        resource('DELETE', 'following/' + name)
        .then((response) => {
            dispatch(initFollowing())
            dispatch(initArticles())
        })
    }
}

const displayFollowing = (name) => {
    return (dispatch) =>{
        const following = {
            username: name
        }
        const avatarPromise = resource('GET', 'avatars/' + name)
        .then((response) => following.avatar = response.avatars[0].avatar)
        const headlinePromise = resource('GET', 'headlines/' + name)
        .then((response) => following.headline = response.headlines[0].headline)
        Promise.all([avatarPromise, headlinePromise] ).then(() => {
            dispatch({ type:'ADD_FOLLOWING', following: following })
        })    
    }
}

