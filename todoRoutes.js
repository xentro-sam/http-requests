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
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: error}));
      }
    }
    break;
  }
        
  case 'POST':{
    let taskData = await getReqData(req);
    try {
      taskData = JSON.parse(taskData);
      let task = await Todo.createTask(taskData);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(task));
    }
    catch {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Input is not in JSON'}));
    }
    break;
  }

  case 'PATCH':{
    if(url.match(/tasks\/([0-9]+)/)) {
      const id = url.split('/')[2];
      const task = await Todo.completeTask(id);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(task));
    }
    else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Bad Request'}));
    }
    break;
  }

  case 'PUT': {
    if(url.match(/tasks\/([0-9]+)/)) {
      const id = url.split('/')[2];
      let taskData = await getReqData(req);
      let updatedTask = await Todo.updateTask(id, JSON.parse(taskData));
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(updatedTask));
    }
    else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Bad Request'}));
    }
    break;
  }
  }
})
  .listen(PORT, () => {
    console.log('Listening at PORT', PORT);
  });