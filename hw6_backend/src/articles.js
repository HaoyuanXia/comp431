let id = 3

const articles = [
    {
        id: 0,
        author: 'Scott',
        text: 'This is Scott\'s article',
        date: new Date(),
        comments: ['happy']
    },
    {
        id: 1,
        author: 'Tom',
        text: 'This is Tom\'s article',
        date: new Date(),
        comments: ['happy']
    },
    {
        id: 2,
        author: 'Jerry',
        text: 'This is Jerry\'s article',
        date: new Date(),
        comments: ['happy']
    }
]


const addArticle = (req, res) => {    
     const article = {
     	id: id++,
     	author: 'Haoyuan',
     	text: req.body.text,
     	date: new Date(),
     	comments: []
     }
     articles.push(article)
     res.send(article)
}

const getArticles = (req, res) => {
	if(req.params.id) {
		res.send(articles.filter((article) => {
			return article.id == req.params.id
		}))		
	} else {
		res.send({articles: articles})
	}
}

const putArticle = (req, res) => {
	const text = req.body.text;
	if(req.params.id > articles.length || req.params.id <= 0){
		res.status(401).send('Forbidden!')
		return;
	} else if(!req.body.commentId) {
		articles[req.params.id].text = req.body.text;
	} else{
		articles[req.params.id].comments.push(req.body.text);
	}
	res.status(200).send({articles: [articles[req.params.id]]});	
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', addArticle)  
	app.put('/articles/:id', putArticle)
} 