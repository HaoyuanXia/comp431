
const cookieParser = require('cookie-parser') 
const md5 = require('md5');
const cookieKey = 'sid'

const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

let users = []

const callbackURL = 'http://localhost:3000/auth/callback'
const clientID = "1650429488599114"
const clientSecret = "ceb1fde63fa29e971ce1f652bf91ac8e"
const config = {clientSecret, clientID, callbackURL}

var redis = require('redis').createClient('redis://h:pd284272cb07263cf96febc2eb58a58141124f92c5107daa22a3edd4ea9c0ee69@ec2-34-206-56-163.compute-1.amazonaws.com:26749')

// serialize the user for the session
passport.serializeUser(function(user, done) {
    users[user.id] = user
    done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id, done) {
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config, 
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile)
        })
    }))


const register = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}

    const salt = Math.random()
	const hash = md5(salt.toString() + password);

	users.push({username: username, salt: salt, hash: hash});
	res.send({username: username, salt: salt, hash: hash});	
}

const isLoggedIn = (req, res, next) => {
	var sid = req.cookies[cookieKey]
	if (!sid) {
		return res.sendStatus(401)
	}
	redis.hgetall(sid, function(err, userObj) {
		console.log(sid + ' mapped to ' + userObj)
		if (userObj) {
			req.username = userObj.username
			next()
		} else {
			return res.sendStatus(401)
		}
	})
}

const isAuthorized = (req, obj) => {
	return obj.hash === md5(obj.salt.toString() + req.body.password)
}

const generateCode = (userObj) =>  {
	return userObj.hash;
}

const login = (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if(!username || !password) {
		res.sendStatus(400)
		return
	}

    const userObj = users.filter(r => { return r.username == username })[0]
	if(!userObj || !isAuthorized(req, userObj)) {
		res.sendStatus(401)
		return
	}
	redis.hmset(generateCode(userObj), userObj)
	// cookie lasts for 1 hour
	res.cookie(cookieKey, generateCode(userObj), 
		{MaxAge: 3600*1000, httpOnly: true })

	res.send({ username: username, result: 'success'})
}

// Function to logout
const Logout = (req, res) => {
    req.logout()
    res.redirect('/')
    return res.status(200).send('OK')
}

const fail = (req, res) => {
    res.send('failed to login')
}

const profile = (req, res) => {
    res.send('ok now what?', req.user)
}

module.exports = app => {
	app.use(cookieParser())
	app.use(session({ secret: 'secretmessage' }))
	app.use(passport.initialize())
    app.use(passport.session())
	app.post('/register', register)
	app.post('/login', login)
 	app.put('/logout', Logout)
	 
	app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/profile', isLoggedIn, profile)
	app.use('/fail', fail)
}