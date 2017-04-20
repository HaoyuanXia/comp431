import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClassName, findClassNames, By } from './selenium'
import common from './common'

describe('Test register a new user', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should create a new article and it should appears in feed ', (done) => {
        const articleText = 'this is a new article'
        sleep(500)
        .then(findId('newArticle').sendKeys(articleText))
        .then(sleep(500))
        .then(findId('postArticle').click())
        .then(sleep(500))
        .then(findClassName('articleContent').getText()
            .then((text) => {
                expect(text).to.eql(articleText)
            }).then(done))
    })

    it('should edit the first article and change the content', (done) => {
        const articleText = 'new content of the article'
        sleep(500)
        .then(findClassName('articleContent').clear())
        .then(findClassName('articleContent').sendKeys(articleText))
        .then(findClassName('edit-article').click())
        .then(findClassName('articleContent').getText()
            .then((text) => {
                expect(text).to.eql(articleText)
            }).then(done))
    })

    it('should search for specical &quot and display that article', (done) => {
        sleep(500)
        .then(findId('search').sendKeys('Only One Article Like This')
            .then(sleep(500))
            .then(findClassNames('articleContent')
                .then((articles) => {
                    expect(articles.length).to.eql(1)
                }).then(done)))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
