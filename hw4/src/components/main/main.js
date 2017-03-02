import React from 'react'
import Nav from './nav'
import Headline from './headline'
import Following from './following'
import {connect} from 'react-redux'
import Article from '../article/Article'

export const Main = (props) => {
    return(
        <div>
            <Nav />
            <div className='container-fluid content'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Headline />
                        <div className='space'/>
                        <Following followings={require('../data/followings.json').followings}/>
                    </div>

                    <div className='col-md-9'>
                        <Article />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Main)