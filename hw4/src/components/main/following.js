import React from 'react'

var id = 3

const SingleUser = ({user, id, self}) => (
    <li>
        <div className='halfSpace' />
        <div>
            <img className='followingUserImg' src={user.picture} />
        </div>
        <div className='nameStatus' >
        <h4 id='name'> {user.name} <small> {user.status} </small> </h4>
        </div>
        <div>
            <button type='button' className='btn btn-info btn-sm' onClick={() => remove(id, self)}>Unfollow</button> 
        </div>
    </li>
)

class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {userList: props.followings}
    }
    render() {
        return(
            <div className='content following'>
                <h4> Following Users </h4>
                <div className="input-group">
                    <span className='input-group-addon' id='personAdd-addOn'>
                        <img id='personAdd' src='https://d30y9cdsu7xlg0.cloudfront.net/png/5024-200.png'/>
                    </span>
                    <input id='addFollowing' type='text' className="form-control" placeholder='Add new following' />
                    <button type='button' className='btn btn-info btn-sm' onClick={() => addFollowing(this)}> Add </button>
                </div>
                <ul>
                    {
                        this.state.userList.map((user) => {
                            return (
                                <SingleUser key={user.id} id={user.id} user={user} self={this}/>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const addFollowing = (self) => {
    var name = document.getElementById('addFollowing').value 
    if(name !== '') {
        self.setState({
            userList: [
                ...self.state.userList,
                {
                    id: id,
                    picture:"https://img.clipartfest.com/f8e4feac12850ab32047a9e4e9bb7233_clip-art-cartoon-farm-cartoon-farm-animals-clipart_682-800.png",
                    name: name,
                    status:"Do you like your life?"
                }
            ]
        })
        id++
        document.getElementById('addFollowing').value = ''
    }
}

const remove = (id, self) => {
    self.setState({
        userList: self.state.userList.filter((user) => user.id != id)
    })
}

export default Following