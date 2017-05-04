const initialState = require('./components/data/initialState.json')

const Reducer = (state = {
    location: 'landingPage',
    articles: [],
    articlesDisplayed: [],
    following: [],
    user: {
        displayName: 'Sammy'
    }
}, action) => {
    switch(action.type) {
        case 'CLEAR_FOLLOWING': {
            return {
                ...state,
                following: []
            }
        }
        case 'CLEAT_ARTICLES': {
            return {
                ...state,
                articles: []
            }
        }
        case 'REGISTER': {
            return state
        }

        case 'LOGOUT': {
            return {
                ...state,
                location: 'landingPage',
                user: { displayName: 'Sammy' },
                articles: [],
                articlesDisplayed: [],
                following: []
            }
        }
        case 'REGISTER_INFO': {
            if(action.info === 'Register Success') {
                return {
                    ...state,
                    registerInfo: 'Registered Successfully!! '
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
        case 'INIT_PROFILE': {
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.profile.email,
                    zipCode: action.profile.zipCode,
                    dateOfBirth: action.profile.dateOfBirth,
                    avatar: action.profile.avatar,
                    password: action.profile.password
                }
            }
        }
        case 'UPDATE_HEADLINE': {
            return {
                ...state,
                user: {
                     ...state.user,
                     accountName: action.username,
                     headline: action.headline
                }
            }
        }
        case 'UPDATE_ARTICLES': {
            return {
                ...state,
                articles: action.articles,
                articlesDisplayed: action.articles
            }
        }
        case 'ADD_FOLLOWING': {
            return {
                ...state,
                following: [ 
                    ...state.following,
                    action.following
                ]
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
        case 'RESUME_ARTICLES': {
            return {
                ...state,
                articlesDisplayed: state.articles
            }
        }
        case 'FILTER_ARTICLES': {
            return {
                ...state,
                articlesDisplayed: state.articles.filter((article) => {
                    if(article.author.indexOf(action.keyWord) == -1 && article.text.indexOf(action.keyWord) == -1) {
                        return false;
                    }
                    return true;
                })
            }
        }
        case 'FOLLOWING_INFO': {
            return {
                ...state,
                followingInfo: action.msg 
            }
        }
        case 'UPDATE_AVATAR': {
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.img
                }
            }
        }
    }
    return state
}
export default Reducer
