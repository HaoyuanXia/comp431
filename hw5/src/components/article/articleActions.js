import { resource } from '../../actions'

export const initArticles = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR'})
        resource('GET', 'articles')
        .then((response) => dispatch({type: 'UPDATE_ARTICLES', articles: response.articles}))
        .catch((error) => console.log(error))
    }
}

export const addNewArticle = ({text}) => {
    return (dispatch) => {
        console.log(text)
        resource('POST', 'article', {text})
        .then((response) => {
            dispatch(initArticles())
        })
        .catch((error) => console.log(error))
    }
}