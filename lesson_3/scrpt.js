
 function createElement(tag, attributes = {}, textContent = '') {
  const element = document.createElement(tag);
  for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
  }
  element.textContent = textContent;
  return element;
}

 function append(parent, ...children) {
  children.forEach(child => {
      parent.appendChild(child);
  });
}

 function remove(element) {
  if (element && element.parentNode) {
      element.parentNode.removeChild(element);
  }
}

 function removeAllChildren(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


class TodoApp {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.tasks = [];

        this.addTaskBtn.addEventListener('click', this.addTask.bind(this));
        this.taskList.addEventListener('click', this.handleTaskActions.bind(this));
        this.taskList.addEventListener('dblclick', this.handleEditTask.bind(this));
        this.taskList.addEventListener('keypress', this.handleEditKeyPress.bind(this));
    }

    addTask() {
      debugger;
        const taskText = this.taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };  
            this.tasks.push(task);
            this.renderTask(task);
            this.taskInput.value = '';
        }
    }

    renderTask(task) {
      const taskItem = createElement('li', { class: 'task', 'data-id': task.id }, task.text);
      if (task.completed) {
          taskItem.classList.add('completed');
      }
      append(taskItem, 
          createElement('button', { class: 'edit-btn' }, 'Edit'),
          createElement('button', { class: 'delete-btn' }, 'Delete')
      );
      append(this.taskList, taskItem);
  }

    handleTaskActions(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            const taskId = parseInt(target.getAttribute('data-id'));
            const task = this.tasks.find(task => task.id === taskId);
            task.completed = !task.completed;
            target.classList.toggle('completed');
        } else if (target.tagName.toLowerCase() === 'button' && target.classList.contains('edit-btn')) {
            const taskId = parseInt(target.parentElement.getAttribute('data-id'));
            this.editTask(taskId);
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        const taskItem = document.querySelector(`.task[data-id="${taskId}"]`);
        const newText = prompt('Edit task:', task.text);
        if (newText !== null) {
            task.text = newText.trim();
            taskItem.textContent = task.text;
        }
    }

    handleEditTask(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'li') {
            target.setAttribute('contenteditable', 'true');
            target.focus();
        }
    }

    handleEditKeyPress(event) {
        const target = event.target;
        if (event.key === 'Enter') {
            event.preventDefault();
            target.blur();
        }
    }
}

new TodoApp();
