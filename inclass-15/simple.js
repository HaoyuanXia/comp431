const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
	console.log('Request method        :', req.method)
	console.log('Request URL           :', req.url)
	console.log('Request content-type  :', req.headers['content-type'])
	console.log('Request payload       :', req.body)


	var payload
	res.setHeader('Content-Type', 'application/json')

	if(req.method == 'GET') {
		if(req.url == '/') {
			payload = { 'hello' : 'world'}
			
			res.statusCode = 200
			res.end(JSON.stringify(payload))
		} else if (req.url == '/articles') {
			payload = { articles: [ 
				{ id:1, author: 'Scott', body: 'A post' },
				{ id:2, author: 'Tom', body: 'Another post' },
				{ id:3, author: 'Jenny', body: 'The third post' }
				]}
			res.statusCode = 200
			res.end(JSON.stringify(payload))
		} else {
			res.statusCode = 400
			res.end('Bad Request')
		}
     } 
	else if(req.method == 'POST') {
		if(req.url == '/login') {
			console.log(JSON.parse(req.body))
			payload = {
				username: JSON.parse(req.body).username,
				result: 'success'
			}
			res.statusCode = 200
			res.end(JSON.stringify(payload))
		} else {
			res.statusCode = 400
			res.end('Bad Request')
		}
	} else if(req.method == 'PUT' && req.url == '/logout') {
		res.statusCode = 200
		res.end('OK')
	} else {
		res.statusCode = 400
		res.end('Bad Request')
	}
}
