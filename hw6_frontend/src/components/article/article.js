import React from 'react'
import NewArticle from './newArticle'
import ArticlesView from './articlesView'


const Article = (props) => {
    return(
        <div className='content'>
            <NewArticle />
            <div className='doubleSpace' />
            <ArticlesView articles={require('../data/articles.json').articles}/>
        </div>
    )
}

export default Article