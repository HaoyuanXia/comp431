import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate reducer (no fetch requests here)', ()=>{

    let url, resource, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                url = require('./actions').url
                resource = require('./actions').default
                Reducer = require('./reducers').default
            }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should initialize state', (done) => {
        const state = Reducer({}, {})
        expect(state).to.exist
        done()
    })

    it('should state success (for displaying success message to user)', (done) => {
        const state = Reducer({}, {type: 'REGISTER_INFO', info: 'Register Success'})
        expect(state.registerInfo).to.eql('Registered Successfully!! ')
        done()
    })

    it('should state error (for displaying error message to user)', (done) => {
        const state = Reducer({}, {type: 'REGISTER_INFO', info: 'Fail to Register'})
        expect(state.registerInfo).to.eql('Fail to Register')
        done()
    })

    it('should set the articles', (done) => {
        const action ={
            type: 'UPDATE_ARTICLES',
            articles: [
                {
                    id: 1,
                    author: 'Scott',
                    text: 'article'
                }
            ]
        }
        const state = Reducer({}, action)
        expect(state.articles[0]).to.eql({id: 1, author: 'Scott', text:'article'})
        done()
    })

    it('should set the search keyword', (done) => {
        // There is not an action to set the search keyword in my design
        // In other words, the search keyword is not stored in the Redux state 
        done()
    })
    
    it('should filter displayed articles by the search keyword', (done) => {
        const articles = [
            {
                id: 1,
                author: 'Scott',
                text: 'Scott\'s article'
            },
            {
                id: 2,
                author: 'Jon Snow',
                text: 'Jon Snow\'s article'
            }
        ]
        let state = Reducer({}, {type:'UPDATE_ARTICLES', articles})
        state = Reducer(state, {type:'FILTER_ARTICLES', keyWord: 'Scott'})
        expect(state.articlesDisplayed.length).to.eql(1)
        done()
    })

})