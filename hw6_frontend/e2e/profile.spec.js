import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClassName, By } from './selenium'
import common from './common'

describe('Test update profile', () => {

    before('should log in', (done) => {
        go().then(common.login)
        .then(findId('toProfilePage').click())
        .then(done)
    })


    it('should update email', (done) => {
        const emailAdd = 'test@test.test'
        sleep(500)
        .then(findId('email').clear())
        .then(findId('email').sendKeys(emailAdd))
        .then(findId('password').sendKeys('test'))
        .then(findId('passwordConfirm').sendKeys('test'))
        .then(findId('btn_update_profile').click()
            .then(sleep(500))
            .then(findId('cur_email').getText()
                .then((text) => expect(text).to.eql(emailAdd)))
                .then(done))
    })

    it('should update zipcode', (done) => {
        const zipcode = '99999'
        sleep(500)
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(zipcode))
        .then(findId('password').sendKeys('test'))
        .then(findId('passwordConfirm').sendKeys('test'))
        .then(findId('btn_update_profile').click()
            .then(sleep(500))
            .then(findId('cur_zipCode').getText()
                .then((text) => expect(text).to.eql(zipcode)))
                .then(done))
    })

    it('shoud update password and get "will not change" message', (done) => {
        sleep(500)
        .then(findId('password').sendKeys('test'))
        .then(findId('passwordConfirm').sendKeys('test'))
        .then(findId('btn_update_profile').click()
            .then(sleep(500))
            .then(findClassName('info').getText()
                .then((text) => expect(text).to.eql('will not change')))
                .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })

})