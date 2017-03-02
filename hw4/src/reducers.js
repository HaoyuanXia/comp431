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
                location: 'mainPage',
            }
        }
        case 'LOGIN': {
            return {
                ...state,
                location: 'mainPage'
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                location: 'landingPage'
            }
        }
        case 'REGISTER_INFO': {
            if(action.info === 'Register Success') {
                return {
                    ...state,
                    registerInfo: ''
                }
            } else {
                return {
                    ...state,
                    registerInfo: action.info
                }
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
                    loginInfo: action.info
                }
            }
        }
        case 'UPDATE_INFO': {
            if(action.info === 'Update Success') {
                return {
                    ...state,
                    updateInfo: ''
                }
            } else {
                return {
                    ...state,
                    updateInfo: action.info
                }
            }
        }
        case 'UPDATE_PROFILE': {
            return {
                ...state,
                user: {
                    ...state.user,
                    displayName: action.newProfile.displayName,
                    email: action.newProfile.email,
                    zipCode: action.newProfile.zipCode,
                    password: action.newProfile.password,
                    phoneNum: action.newProfile.phoneNum
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
        case 'TO_MAIN_PAGE': {
            return {
                ...state,
                location: 'mainPage'
            }
        }
        case 'TO_PROFILE_PAGE': {
            return {
                ...state,
                location: 'profilePage'
            }
        }
    }
    return state
}
export default Reducer
