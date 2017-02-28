const initialState = require('./components/data/initialState.json')
const initialArticles = require('./components/data/articles.json')

const Reducer = (state = {
    location: initialState.location,
    userList: initialState.userList,
    registerInfo: initialState.registerInfo,
    loginInfo: initialState.loginInfo,
    articles: initialArticles.articles,
    user: initialState.user
}, action) => {
    switch(action.type) {
        case 'REGISTER': {
            return {
                ...state,
                userList: [
                    ...state.userList,
                    {
                        accountName: action.user.accountName, 
                        password: action.user.password,
                        isLogged: false
                    }
                ]
            }
        }
        case 'LOGIN': {
            return {
                ...state,
                location: 'mainPage',
                userList: state.userList.map(({accountName, password, isLogged}) => (
                    {accountName, password, isLogged: true}
                ))
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                location: 'landingPage'
            }
        }
        case 'LOGIN_INFO': {
            if(action.info === 'Login Success') {
                return {
                    ...state,
                    loginInfo: ''
                }
            } else {
                return {
                    ...state,
                    loginInfo: '*** Please Check Your Account Name and Password'
                }
            }
        }
        case 'ADD_ARTICLE': {
            return {
                ...state,
                articles: [
                    {
                        author:'',
                        text: action.text,
                        timestamp:'',
                        picture:''
                    },
                    ...state.articles
                ]
            }
        }
    }
    return state
}
export default Reducer
