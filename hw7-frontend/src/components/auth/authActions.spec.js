import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Authentication (involves mocked requests)', () => {

    let url, resource, login, logout, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                url = require('../../actions').url
                resource = require('../../actions').default
                login = require('./authActions').login
                logout = require('./authActions').logout
                Reducer = require('../../reducers').default
            }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })


   it('should log in a user', (done)=>{
       const username = 'hx12'
       const password = 'sweden-seem-salt'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result: 'success' }
        })

        let callCount = true, state
        login({username, password})(
            (action) => {
                if(callCount) {
                    expect(action).to.eql({ type:'LOGIN', username })
                    state = Reducer({}, action)
                    expect(state.user.accountName).to.eql(username)
                    callCount = !callCount
                } else {
                    done()
                }
            })      
    })

    
    it('should not log in an invalid user', (done) => {

        const username = 'unauthorized'
        const password = 'unauthorized'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

        login({username, password})(
            (action) => {
                expect(action).to.eql({ type:'LOGIN_INFO',  info: 'Error logging in as ' + username })
                done()
            }
        )
    }) 

    it('should log out a user (state should be cleared)', (done) => {

        mock(`${url}/logout`, {
            method: 'PUT',
            headers: {'Content-Type': 'text/plain'}
        })

        let state = {user: {username: 'test'}}
        logout()(
            (action) => {
                expect(action).to.eql({ type:'LOGOUT'})
                state = Reducer(state, action)
                expect(state.user).to.eql({})
                done()
        })   
    })
    
})