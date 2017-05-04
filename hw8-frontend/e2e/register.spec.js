import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test register a new user', () => {

     before('should load the page', (done)=>{
        go().then(done)
    })

    it('should register a new user', (done) => {
        sleep(500)
        .then(findId('accountName').sendKeys('testUser'))
        .then(findId('displayName').sendKeys('testUser'))
        .then(findId('email').sendKeys('test@test.test'))
        .then(findId('phoneNum').sendKeys(1234567890))
        .then(findId('dateOfBirth').sendKeys('01/01/1990'))
        .then(findId('zipcode').sendKeys('12345'))
        .then(findId('newPassword').sendKeys('12345'))
        .then(findId('newPasswordConfirm').sendKeys('12345'))
        .then(findId('register').click())
        .then(sleep(500))
        .then(findId('registerInfo').getText()
            .then((info) => {
                expect(info).to.eql('Registered Successfully!!')
            }).then(done))
    })
})
