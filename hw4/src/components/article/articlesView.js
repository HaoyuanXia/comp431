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
                <td> <h4> Jimmy <small> posted at {new Date().toLocaleTimeString()} </small> </h4> </td>
            ) : (
                <td> <h4> {article.author} <small> posted at {new Date().toLocaleTimeString()} </small> </h4> </td>
            )}
        </tr>
        <tr>
            {article.picture == "" ? (
                <td > <h4> No Image </h4> </td>
            ) : (
                <td> <img className='image' src={article.picture} /> </td>
            )}

            <td >
                <div className='text'> { article.text } </div>
                <div className='halfSpace' />
                <div className='btn-group' role='group'>
                    <button type='button' className='btn btn-success'>Comment</button>
                    <button type='button' className='btn btn-success'>Edit</button>
                </div> 
            </td>
        </tr>
    </tbody> 
)

class ArticlesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {articles: props.articles, articlesDisplayed: props.articles}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.articles,
            articlesDisplayed: nextProps.articles
        })
    }

    render() {
        return(
            <div className='articlesView'>
                <div className="input-group">
                    <span className='input-group-addon' id='magnifyingGlass-addOn'>
                        <img id='magnifyingGlass' src='https://cdn1.iconfinder.com/data/icons/user-interface-elements/154/search-loop-512.png'/>
                    </span>
                    <input id='search' type='text' className="form-control" placeholder='Search your feed' onChange={() => search(this)} />
                </div>

                <table className='table' id='table'>
                    {
                        this.state.articlesDisplayed.map((article, index) => {
                            return (
                                <Card key={index} article={article} index={index}/>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
}

const search = (self) => {
    var keyWord = document.getElementById('search').value
    if(keyWord === "") {
        self.setState({
            ...self.state,
            articlesDisplayed: self.state.articles
        })
    } else {
        self.setState({
            ...self.state,
            articlesDisplayed: self.state.articles.filter((article) => {
                if(article.author.indexOf(keyWord) == -1 && article.text.indexOf(keyWord) == -1) {
                    return false;
                }
                return true;
            })
        })   
    }
}

export default connect(
    (state) => {
        return {
            articles: state.articles
        }
    },  
    (dispatch) => {
        return {

        }
    }
)(ArticlesView)