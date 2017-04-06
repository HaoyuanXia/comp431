import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { editArticle, addComment, editComment } from './articleActions'

const ContentEditable = require('react-contenteditable')
let commentText = null

const Card = ({ article, index, loggedInUser, dispatch }) => (
    <tbody>
        <tr>
            <td/>
            <td> <h4> {article.author} <small> posted at  {article.date} </small> </h4> </td>
        </tr>
        <tr>
            {article.img == null || article.img == undefined ? (
                <td > <h4> No Image</h4> </td>
            ) : (
                <td> <img className='image' src={article.img} /> </td>
            )}

            <td >
                <ContentEditable id={'article' + article._id} className="text articleContent" html={article.text} disabled={article.author != loggedInUser} />

                <div className='halfSpace' />
                <div className='btn-group' role='group'>
                    <button type='button' className='btn btn-success' data-toggle='collapse'
                        data-target={'#collapseComments' + index}  >Comments ({article.comments.length})</button>
                    <button type='button' className='btn btn-info' data-toggle='collapse'
                        data-target={'#collapseAddComment' + index}  >Add Comment</button>
                    { article.author == loggedInUser ? (
                        <button type='button' className='btn btn-primary edit-article' onClick={() => edit(article._id, dispatch)} >Edit</button>
                    ) : (
                        <button type='button' className='btn btn-primary' disabled="disabled" >Edit</button>
                    )}
                </div> 
            </td>
        </tr>

        <tr className='collapse' id={'collapseAddComment' + index}>
            <td/>
            <td>
                <form className='form-horizontal'>
                    <div className='form-group'>
                        <div className='col-sm-10'>
                            <input className='text form-control col-md-10' type='text' placeholder='write your comment here! ' 
                                onChange={(e) => commentText = e.target.value }/>
                        </div>
                        <button type='button col-md-2' className='btn-info btn-sm' data-toggle='collapse'
                            data-target={'#collapseAddComment' + index} 
                            onClick={(e) => {
                                e.preventDefault()
                                if(commentText != null && commentText != '') {  
                                    dispatch(addComment(article._id, commentText))
                                }
                                commentText = null
                        }} > Post </button>
                    </div>
                </form>
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
                                   <h5>  { comment.author } <small> posted at { comment.date } </small> </h5>
                                    <ContentEditable id={'comment' + comment.commentId} className="text" 
                                        html={comment.text} disabled={comment.author != loggedInUser} />
                                    { comment.author == loggedInUser ? (
                                        <button type='button' className='btn btn-info btn-sm' onClick={(e) => {
                                            e.preventDefault()
                                            const edittedComment = document.getElementById('comment' + comment.commentId).innerHTML
                                            editComm(article._id, comment.commentId, edittedComment, dispatch)
                                        }}> edit </button>
                                    ) : (
                                        <button type='button' className='btn btn-info btn-sm' disabled="disabled" > edit</button>
                                    )}
                                </li>
                        )})}
                    </ul>
                </td>
            </tr>
        ) : ( null )}
    </tbody> 
)

export const ArticlesView = ({articlesDisplayed, resumeArticles, filterArticles, loggedInUser, dispatch }) => (
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
                    <Card key={index} article={article} index={index} loggedInUser={loggedInUser} dispatch={dispatch}/>
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

const edit = (articleID, dispatch) => {
    const text = document.getElementById('article' + articleID).innerHTML   
    dispatch(editArticle({articleID, text}))
}

const editComm = (articleId, commentId, text, dispatch) => {
    dispatch(editComment(articleId, commentId, text))
}

export default connect(
    (state) => {
        return {
            articlesDisplayed: state.articlesDisplayed,
            loggedInUser: state.user.accountName
        }
    },  
    (dispatch) => {
        return {
            resumeArticles: () => dispatch({type: 'RESUME_ARTICLES'}),
            filterArticles: (keyWord) => dispatch({type: 'FILTER_ARTICLES', keyWord: keyWord}),
            dispatch: dispatch
        }
    })(ArticlesView)
