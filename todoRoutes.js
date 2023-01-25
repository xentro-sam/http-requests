const http = require('http');
const Todo = require('./controllers');
const PORT = 3000;

http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  switch (method) {
  case 'GET':
    if(url === '/tasks') {
      const tasks = await Todo.getTasks();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(tasks));
    }
  }
})
  .listen(PORT, () => {
    console.log('Listening at PORT', PORT);
  });