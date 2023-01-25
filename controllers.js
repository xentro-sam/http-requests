let taskList = require('./data');

function getIndexFromId(id) {
  let index = -1;
  for(let idx = 0; idx < taskList.length && index === -1; idx++) {
    if(taskList[idx].id === parseInt(id)) {
      index = idx;
    }
  }
  return index;
}

class Controller {
  getTasks() {
    return new Promise((resolve) => resolve(taskList));
  }
    
  getTask(id) {
    return new Promise((resolve, reject) => {
      let task = taskList.find((todo) => todo.id === parseInt(id));
      if(task) {
        resolve(task);
      }
      reject(`Task with id ${id} was not found`);
    });
  }

  createTask(task) {
    let newId = Math.floor(2 + Math.random() * 10);
    return new Promise((resolve) => {
      let newTask = {
        id: newId,
        isComplete: false,
        ...task
      };
      taskList.push(newTask);
      resolve(newTask);
    });
  }

  deleteTask(id) {
    return new Promise((resolve, reject) => {
      let index = getIndexFromId(id);
      if(index === -1) {
        reject(`Task with id ${id} was not found`);
      }
      taskList = [...taskList.slice(0, index), ...taskList.slice(index + 1)];
      resolve('Task deleted successfully');
    });
  }

  completeTask(id) {
    return new Promise((resolve, reject) => {
      let index = getIndexFromId(id);
      if(index === -1) {
        reject(`Task with id ${id} was not found`);
      }
      taskList[index].isComplete = true;
      resolve(taskList[index]);
    });
  }
  
  updateTask(id, data) {
    return new PromiseO((resolve, reject) => {
      let index = getIndexFromId(id);
      if(index === -1) {
        reject(`Task with id ${id} was not found`);
      }
      taskList[index] = {...taskList[index], ...data}
      resolve(taskList[index]);
    });
  }
}

module.exports = Controller;