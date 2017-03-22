import React from 'react'
import { connect } from 'react-redux'
import { resource } from '../../actions'

let status 


// Headline component displaying userName and avatar
const Headline = ({user, dispatch}) => {
    return(
        <div className='content headline'>
            <img src={ user.avatar } alt='image'
                className='img-responsive center-block' id='image' />
            <div className='halfSpace' />
            <label className='displayName'> {user.accountName} </label>
            <div className='space' />
            <div id='status'> {user.headline}</div>
            <div className='halfSpace' />
            <div className="input-group">
                <span className='input-group-addon' id='pencil-addOn'>
                    <img id='pencil' src='http://simpleicon.com/wp-content/uploads/pencil.png'/>
                </span>
                <input id='newStatus' type='text' className="form-control" placeholder='New Status' aria-describedby="pencil-addOn" 
                    ref={(node) => status = node}/>
            </div>
            <div className='halfSpace' />
            <button type='button' className='btn btn-primary btn-sm' onClick={() => updateStatus(dispatch)}>Update Status</button>
        </div>
    )
}


// get the input status and update on server
const updateStatus = (dispatch) => {
    if(status.value != '') {
        resource('PUT', 'headline', { headline: status.value })
        .then((response) => {
            dispatch({type: 'UPDATE_HEADLINE', username: response.username, headline: response.headline})
        })
        status.value = ''
    }
}

export default connect(
    (state) => {
        return {
            user: state.user
        }
    },null)(Headline)