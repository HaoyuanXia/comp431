const express = require('express')
const bodyParser = require('body-parser')

const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    next()
}

const app = express()
app.use(corsMiddleware)
app.use(bodyParser.json())
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/auth')(app)
require('./src/following')(app)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
