// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const card = document.querySelector('.card');
const heading = document.querySelector('h5');


// Dynamic body color change event listener
card.addEventListener('mousemove', runEvent)


// Load all event listeners
loadEventListeners(addTask);

// Load all event listeners
function loadEventListeners(addTask){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click',removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks)
  // filter task event
  filter.addEventListener('keyup', filterTasks)

}

// Get Tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
     // Creaste li element
     const li = document.createElement('li');
     // Add Class
     li.className= 'collection-item';
     // Create Text Node and Append to li
     li.appendChild(document.createTextNode(task));
 
     // Create New link element
     const link = document.createElement('a');
     // Add Class
     link.className = 'delete-item secondary-content';
     // Add icon html
     link.innerHTML = '<i class="fa fa-trash-o fa-lg"></i>';
     // Append the link to li
     li.appendChild(link)
 
     // Append li to ul
      taskList.appendChild(li)
  })
}

 // Add Task 
function addTask(e) {
    if(taskInput.value === '') {
      alert('You Need To Add A Task');  
    }else{
      confirm('Are You Sure?')
    }
    
    // Creaste li element
    const li = document.createElement('li');
    // Add Class
    li.className= 'collection-item';
    // Create Text Node and Append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create New link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-trash-o fa-lg"></i>';
    // Append the link to li
    li.appendChild(link)

    // Append li to ul
     taskList.appendChild(li)


     // Store in Local Storage
     storeTaskInLocalStorage(taskInput.value);
     

    // Clear Input
     taskInput.value = ''


    e.preventDefault();
}            

// STore Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();

      // Remove From Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  } 
}

// Remove From Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear Tasks
function clearTasks(){
  taskList.innerHTML = ''

  //Clear from Local Stotage
  clearTasksFromLocalStorage();
}

//Clear Tasks From Local Storage 
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Search Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLocaleLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none'
    }
  })
}

// Dynamic body color change
function runEvent(e){

  heading.value = `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`;

  document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40 )`;
}
