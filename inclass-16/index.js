
const express = require('express')
const bodyParser = require('body-parser')


let id = 4

let articles = [
	{
		id: 1,
		author: "Scott",
		text: "This is my first article"
	},
	{
		id: 2,
		author: "Max",
		text: "This is my second article"
	},
	{
		id: 3,
		author: "Haoyuan",
		text: "You are my sunshine"
	}
]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const newArticle = {
     	id: id,
     	text: req.body.text
     }
     res.send(newArticle)
     articles.push(newArticle)
     id++
}

const hello = (req, res) => res.send({ hello: 'world!!' })

const getArticles = (req, res) => {
	res.send({articles: articles})
}


const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
