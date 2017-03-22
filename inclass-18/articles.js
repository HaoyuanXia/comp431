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


const getArticles = (req, res) => {
	if(req.params.id) {
		res.send(articles.filter((article) => article.id == req.params.id))
	} else {
		res.send(articles)
	}
}

const postArticle = (req, res) => {

	const newArticle = {
     	id: id++,
     	text: req.body.text
	}
	res.send(newArticle)
	articles.push(newArticle)
}

module.exports = (app) => {
	app.get('/articles/:id?', getArticles)
	app.post('/article', postArticle)
}