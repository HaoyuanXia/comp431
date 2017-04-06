import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate actions (these are functions that dispatch actions)', () => {

    let url, resource, succRegisterAction, failRegisterAction, toMainAction, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                url = require('./actions').url
                resource = require('./actions').default
                succRegisterAction = require('./actions').succRegisterAction
                failRegisterAction = require('./actions').failRegisterAction
                toMainAction = require('./actions').toMainAction
                Reducer = require('./reducers').default
            }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })
    
    it('resource should be a resource (i.e., mock a request)', (done)=> {
        mock(`${url}/test`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { test: 'test'}
        })

        resource('GET', 'test').then((response) => {
            expect(response).to.exist
        })
        .then(done)
    })

    it('resource should give me the http error', (done)=> {
		resource('GET', 'test').catch((error) => {
            expect(error).to.exist
		})
        .then(done)
	})

    it('resource should be POSTable', (done)=> {
		const username = 'username'
		const password = 'password'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, password}
		})
        
		resource('POST', 'login', {username, password })
        .then((response) => {
			expect(response).to.eql({username: 'username', password: 'password'})
		})
        .then(done)
	})

    it('should update error message (for displaying error mesage to user)', (done) => {
        const state = Reducer({registerInfo: ''}, succRegisterAction)
        expect(state.registerInfo).to.eql('Registered Successfully!! ')
        done()
    })

    it('should update success message (for displaying success message to user)', (done) => {
        const state = Reducer({registerInfo: ''}, failRegisterAction)
        expect(state.registerInfo).to.eql('Fail to Register')
        done()
    })

    it('should navigate (to profile, main, or landing)', (done) => {
        const state = Reducer({location: 'landingPage'}, toMainAction)
        expect(state.location).to.eql('mainPage')
        done()
    })

})