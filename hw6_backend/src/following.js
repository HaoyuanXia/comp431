const followings = [
    {
        username: 'Haoyuan',
        following: [
            'Scott',
            'Jon'
        ]
    }
]

const getFollowing = (req, res) =>{
    const user = req.params.user ? req.params.user : 'Haoyuan'
    const following = followings.filter((foll) => {
        foll.username == user
    })[0]
    res.send({
        username: user,
        following: following
    })
}

const putFollowing = (req, res) =>{
    followings[0].following.push(req.params.user)
    res.send({
        username: followings[0].username,
        following: followings[0].following
    })
}

const deleteFollowing = (req, res)=>{
    
    followings[0].following = followings[0].following.filter((v)=>{
        return v != req.params.user
    })
    res.send({
        username: followings[0].username,
        following: followings[0].following
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}