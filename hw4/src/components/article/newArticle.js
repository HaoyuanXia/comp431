import React from 'react'

import {connect} from 'react-redux'

const NewArticle = ({addNew, addedNew}) => {
    return(
        <div className='newArticle content'>
            <label id='whatIsNew'> What's new with you? </label>
            <textarea className='form-control' rows='5' id='newArticle' placeholder='Share something interesting!'/>
            <div className='halfSpace' />
            <div className="row">
                <label className="col-md-1 control-label">Select Picture: </label>
                <div className='col-md-3'>
                <input type='file'/>
                </div>
                <div className='col-md-6' />
                <div className='btn-group col-md-2' role='group'>
                    <button type='button' className='btn btn-info' onClick={() => { 
                        addNew(document.getElementById('newArticle').value)
                    }}>Post</button>
                    <button type='button' className='btn btn-info' onClick={() => {
                         document.getElementById('newArticle').value = ''}
                         }>
                         Clear
                    </button>
                </div> 
            </div>
        </div>
    )
}

export default connect(null,
    (dispatch) => {
        return {
            addNew: (text) => dispatch({type: 'ADD_ARTICLE', text}),
        }
    }
)(NewArticle)