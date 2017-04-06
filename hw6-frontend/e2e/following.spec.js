import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClassName, findClassNames, By } from './selenium'
import common from './common'

describe('Test following functions', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })


    it('should add a following', (done) => {
        let count = null
        sleep(500)
        .then(findClassNames('singleFollowing')
            .then((response) => { count = response.length })
            .then(findId('addFollowing').clear())
            .then(findId('addFollowing').sendKeys('yy55'))
            .then(findId('btnAddFollowing').click()
                .then(sleep(500))
                .then(findClassNames('singleFollowing')
                    .then((followings) => {
                        expect(followings.length).to.eql(count + 1)
                    }).then(sleep(2000)).then(done))))
    })

    it('should remove a following', (done) => {
        let count = null
        sleep(500)
        .then(findClassNames('singleFollowing')
            .then((response) => { count = response.length })
            .then(findClassName('btnRemoveFollowing').click()
                .then(sleep(500))
                .then(findClassNames('singleFollowing')
                    .then((followings) => {
                        expect(followings.length).to.eql(count - 1)
                    }).then(sleep(2000)).then(done))))
    })



    after('should log out', (done) => {
        common.logout().then(done)
    })

})