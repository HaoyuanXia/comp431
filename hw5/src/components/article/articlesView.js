import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const articlesInfo = require('../data/articles.json')
const articles = articlesInfo.articles
const images = articlesInfo.images

const Card = ({article, index}) => (
    <tbody>
        <tr>
            <td/>
            {article.author == "" ? (
                <td> <h4> Anonymity <small> posted at {article.date} </small> </h4> </td>
            ) : (
                <td> <h4> {article.author} <small> posted at  {article.date} </small> </h4> </td>
            )}
        </tr>
        <tr>
            {article.picture == "" || article.picture == undefined ? (
                <td > <h4> No Image</h4> </td>
            ) : (
                <td> <img className='image' src={article.picture} /> </td>
            )}

            <td >
                <div className='text'> { article.text } </div>
                <div className='halfSpace' />
                <div className='btn-group' role='group'>
                    <button type='button' className='btn btn-success' data-toggle='collapse'
                        data-target={'#collapseComments' + index}  >Comments ({article.comments.length})</button>
                    <button type='button' className='btn btn-success'>Edit</button>
                </div> 
            </td>
        </tr>

        { article.comments.length > 0 ? (
            <tr className='collapse' id={'collapseComments' + index} >
                <td/>
                <td>
                    <ul>
                        { article.comments.map((comment, index) => {
                            return (
                                <li key={index}>
                                    { comment.author }:  {comment.text}
                                </li>
                            )
                        })}
                    </ul>
                </td>
            </tr>
        ) : (
            null
        )}
    </tbody> 
)


const ArticlesView = ({articlesDisplayed, resumeArticles, filterArticles}) => (
    <div className='articlesView'>
        <div className="input-group">
            <span className='input-group-addon' id='magnifyingGlass-addOn'>
                <img id='magnifyingGlass' src='https://cdn1.iconfinder.com/data/icons/user-interface-elements/154/search-loop-512.png'/>
            </span>
            <input id='search' type='text' className="form-control" placeholder='Search your feed' onChange={(event) => search(event, resumeArticles, filterArticles)} />
        </div>

        <table className='table' id='table'>
            {
                articlesDisplayed.map((article, index) =>  {
                    return (
                    <Card key={index} article={article} index={index}/>
                    )})
            }
        </table>
    </div>
)     

const search = (event, resumeArticles, filterArticles) => {
    var keyWord = event.target.value
    if(keyWord === "") {
        resumeArticles()
    } else {
        filterArticles(keyWord)
    }
}

export default connect(
    (state) => {
        return {
            articlesDisplayed: state.articlesDisplayed
        }
    },  
    (dispatch) => {
        return {
            resumeArticles: () => dispatch({type: 'RESUME_ARTICLES'}),
            filterArticles: (keyWord) => dispatch({type: 'FILTER_ARTICLES', keyWord: keyWord})
        }
    })(ArticlesView)