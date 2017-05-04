import React from 'react'
import { resource } from '../../actions'
import { connect } from 'react-redux'
import { addFollowing, removeFollowing } from './followingActions'

let id = 3

const SingleUser = ({user,  dispatch}) => {
    
    return (
        <li className='singleFollowing'>
            <div className='halfSpace' />
            <div>
                <img className='followingUserImg' src={user.avatar} />
            </div>
            <div className='nameStatus' >
            <h4 id='name'> {user.username} <small> {user.headline} </small> </h4>
            </div>
            <div>
                <button type='button' className='btn btn-info btn-sm btnRemoveFollowing' onClick={() => remove({dispatch, username: user.username})}>Unfollow</button> 
            </div>
        </li>
    )
}

const Following = ({following, info, dispatch}) => {
    return (
        <div className='content following'>
            <h4> Following Users </h4>
            <h5> { info } </h5>
            <div className="input-group">
                <span className='input-group-addon' id='personAdd-addOn'>
                    <img id='personAdd' src='https://d30y9cdsu7xlg0.cloudfront.net/png/5024-200.png'/>
                </span>
                <input id='addFollowing' type='text' className="form-control" placeholder='Add new following' />
                <button type='button' id='btnAddFollowing' className='btn btn-info btn-sm' onClick={() => add({dispatch})}> Add </button>
            </div>
            <ul className='ul_noListStyle'>
                {
                    following.map((userId, index) => {
                        return (
                            <SingleUser key={index}  user={userId} dispatch={dispatch}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}


const add = ({dispatch}) => {
    const username = document.getElementById('addFollowing')
    if(username.value != '') {
        dispatch(addFollowing(username.value))
        username.value = ''
    }
}

const remove = ({dispatch, username}) => {
    dispatch(removeFollowing(username))
}

export default connect(
    (state) => {
        return {
            following: state.following,
            info: state.followingInfo
        }
    }, null)(Following)
