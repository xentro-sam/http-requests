const http = require('http');
const Todo = require('./controllers'); 
const { getReqData } = require('./utils');
const PORT = 3000;

http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  switch (method) {
  case 'GET': {
    if(url === '/tasks') {
      const tasks = await Todo.getTasks();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(tasks));
    }
    if(url.match(/tasks\/([0-9]+)/)) {
      try {
        const id = url.split('/')[2];
        const task = await Todo.getTask(id);
        console.log(task);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(task));
      }
      catch(error) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: error}));
      }
    }
    break;
  }
        
  case 'POST':{
    let taskData = await getReqData(req);
    let task = await Todo.createTask(JSON.parse(taskData));
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(task));
    break;
  }

  case 'PATCH':{
    const id = url.split('/')[2];
    const task = await Todo.completeTask(id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(task));
    break;
  }

  case 'PUT': {
    const id = url.split('/')[2];
    let taskData = await getReqData(req);
    let updatedTask = await Todo.updateTask(id, JSON.parse(taskData));
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(updatedTask));
    break;
  }
  }
})
  .listen(PORT, () => {
    console.log('Listening at PORT', PORT);
  });