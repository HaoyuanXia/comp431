import React from 'react'

const Headline = ({user}) => {
    return(
        <div className='content headline'>
            <img src='http://www.downloadclipart.net/large/1509-cartoon-owl-design.png' alt='image'
                className='img-responsive center-block' id='image' />
            <div className='halfSpace' />
            <label className='displayName'> {user.accountName} </label>
            <div className='space' />
            <div id='status'> For a better life, be a better owl  !! </div>
            <div className='halfSpace' />
            <div className="input-group">
                <span className='input-group-addon' id='pencil-addOn'>
                    <img id='pencil' src='http://simpleicon.com/wp-content/uploads/pencil.png'/>
                </span>
                <input id='newStatus' type='text' className="form-control" placeholder='New Status' aria-describedby="pencil-addOn" />
            </div>
            <div className='halfSpace' />
            <button type='button' className='btn btn-primary btn-sm' onClick={() => updateStatus()}>Update Status</button>
        </div>
    )
}

const updateStatus = () => {
    if(document.getElementById('newStatus').value != '') {
        document.getElementById('status').innerHTML = 
            document.getElementById('newStatus').value
        document.getElementById('newStatus').value = ''
    }
}

export default Headline