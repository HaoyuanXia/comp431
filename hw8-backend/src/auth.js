
const cookieParser = require('cookie-parser') 
const md5 = require('md5')
const cookieKey = 'sid'

const callbackURL = 'http://localhost:3000/auth/callback'
const clientID = "1650429488599114"
const clientSecret = "ceb1fde63fa29e971ce1f652bf91ac8e"
const config = {clientSecret, clientID, callbackURL}

const User = require('./model').User
const Profile = require('./model').Profile

var redis = require('redis').createClient('redis://h:pd284272cb07263cf96febc2eb58a58141124f92c5107daa22a3edd4ea9c0ee69@ec2-34-206-56-163.compute-1.amazonaws.com:26749')

const register = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	const displayname = req.body.displayname
	const email = req.body.email
	const dob = req.body.dob
	const zipcode = req.body.zipcode

	if(!username || !password){
		res.sendStatus(400)
		return
	}

	User.find({username: username}).exec( (error, users) => {
		if(users.length != 0) {
			res.status(401).send({result: 'This username already exists'})
			return
		}
		const salt = Math.random()
		const hash = md5(salt.toString() + password)
		const userObj = new User({
			username: username,
			salt: salt,
			hash: hash
		})
		const profileObj = new Profile({
			username: username,
			displayname: displayname,
			email: email,
			dob: dob,
			zipcode: zipcode
		})
		new User(userObj).save()
		new Profile(profileObj).save()
		res.send({username: username, salt: salt, hash: hash})
	})	
}

const isLoggedIn = (req, res, next) => {
	const sid = req.cookies[cookieKey]
	if (!sid) {
		res.sendStatus(401)
		return
	}
	redis.hgetall(sid, function(err, userObj) {
		if (userObj) {
			req.username = userObj.username
			next()
		} else {
			// res.redirect('./login')
			res.sendStatus(401)
		}
	})
}

const isAuthorized = (req, obj) => {
	return obj.hash === md5(obj.salt.toString() + req.body.password)
}

const login = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if(!username || !password) {
		res.sendStatus(400)
		return
	}

	User.find({ username: username }).exec((error, users) => {
		if(users.length == 0) {
			res.status(401).send({result: 'No matched username'})
			return
		}
		const userObj = users[0]
	
		if(!userObj || !isAuthorized(req, userObj)) {
			res.status(401).send({result: 'Username and password do not match'})
			return
		}
		const sessionKey = md5('ricebookSecretMessage' + new Date().getTime() + userObj.username)
		redis.hmset(sessionKey, userObj)
		res.cookie(cookieKey, sessionKey, {MaxAge: 3600*1000, httpOnly: true })
		res.send({ username: username, result: 'success'})
	})
}

const putPassword = (req, res) => {
    
    if (req.body.password){
        User.find({username: req.username}).exec(function(error, users){
            if(error){
                res.status(500).send()
                return
            }
            User.update({username: req.username}, {$set: {hash: md5(users[0].salt.toString() + req.body.password)}}, function(err){
                if (err){
                    res.status(500).send()
                    return
                }
                res.send({username: users[0].username, status: 'success'})
            })
        })
    }
    else{
        res.status(400).send()
    }

}


// Function to logout
const logout = (req, res) => {
	res.clearCookie(cookieKey)
	redis.del(req.cookies[cookieKey])
    res.status(200).send('OK')
}


module.exports = app => {
	app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
	app.use(isLoggedIn)
 	app.put('/logout', logout)
	app.put('/password', putPassword)
}
