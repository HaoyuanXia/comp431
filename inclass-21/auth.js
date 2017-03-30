const cookieParser = require('cookie-parser') 
const md5 = require('md5');

var User = {users: [{username: "", salt: "", hash: ""}]}

let users = []

var cookieKey = 'sid'

function register(req, res) {
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


function isAuthorized(req, obj) {
	console.log(obj)
	return obj.hash === md5(obj.salt.toString() + req.body.password)
}

function generateCode(userObj) {
	return userObj.hash;
}

function login(req, res) {
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

	// cookie lasts for 1 hour
	res.cookie(cookieKey, generateCode(userObj), 
		{MaxAge: 3600*1000, httpOnly: true })

	res.send({ username: username, result: 'success'})
}

module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register)
	app.post('/login', login)
}
