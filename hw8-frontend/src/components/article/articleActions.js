import { resource } from '../../actions'

export const initArticles = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_ARTICLES'})
        resource('GET', 'articles')
        .then((response) => dispatch({type: 'UPDATE_ARTICLES', articles: response.articles}))
        .catch((error) => console.log(error))
    }
}

export const addNewArticle = (fd) => {
    return (dispatch) => {
        resource('POST', 'article', fd, false)
        .then ((response) => {
            dispatch(initArticles())
        })
        .catch((err) => console.log(err))
    }
}

export const editArticle = ({articleID, text}) => {
    return (dispatch) => {
        resource('PUT', 'articles/' + articleID, { text })
        .then((response) => {
            dispatch(initArticles())
        })
        .catch((error) => console.log(error))
    }
}

export const addComment = (articleID, text) => {
    return (dispatch) => {
        resource('PUT', 'articles/' + articleID, { text, commentId: -1 })
        .then((response) => {
            dispatch(initArticles())
        })
        .catch((error) => console.log(error))
    }
}

export const editComment = (articleID, commentId, text) => {
    
    return (dispatch) => {
        resource('PUT', 'articles/' + articleID, {text, commentId})
        .then((response) => {
            console.log(response)
            dispatch(initArticles())
        })
        .catch((error) => console.log(error))
    }
}