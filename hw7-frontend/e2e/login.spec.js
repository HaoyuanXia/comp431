import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Login and Update Headline', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('headlineName').getText()
                .then(text => {
                    expect(text).to.equal(common.creds.username)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        const newStatus = 'new status'
        sleep(500)
        .then(findId('newStatus').sendKeys(newStatus))
        .then(findId('update').click())
        .then(findId('status').getText()
            .then(text => {
                expect(text).to.equal(newStatus)
            })
            .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
