const homebtn = document.querySelector('#homebtn_30');
const Errorpopup = document.getElementById('Errorpopup_30')
const ErrorMsg = document.getElementById('ErrorMsg_30');
const TaskList = document.getElementById('tasklist_30');
///////////////////////////////////////////////////////////////////////
const Inputbox = document.querySelector('#taskEnter_30');
const Taskdate = document.querySelector('#TaskDate_30');
const Addbtn = document.querySelector('#Addbtn_30');
const Clearbtn = document.querySelector('#Clearbtn_30');
///////////////////////////////////////////////////////////////////////
const tasks = document.querySelector('.tasks_30');
///////////////////////// current task elements ///////////////////////////////////////////
const today = document.querySelector('#today_30');
const today_container = document.querySelector('#crrnt_container_30');
//////////////////// upcoming task element /////////////////////////////////////////////////
const upcoming = document.querySelector('#upcoming_30');
const upcoming_container = document.querySelector('#upcmg_container_30');
///////////////////////completed task elements ///////////////////////////////////////////
const completedTask = document.querySelector('#completed_30');
const completed_container = document.querySelector('#cmp_container_30');
////////////////////////missed task elements ////////////////////////////////////////////
const Missed = document.querySelector('#Missed_30');
const Missed_container = document.querySelector('#miss_container_30');
/////////////////////// footer btn elements /////////////////////////////////////////////
const viewMisedTasks = document.querySelector('#view_miss_task_30');
const viewCompletedTasks = document.querySelector('#view_comp_task_30');
const viewCurrentTasks = document.querySelector('#view_current_task_30');
///////////// global variable ///////////////////////////////////////////////////////////
var currentdate;
var month;
var id = 0;
var lastId = 0;
/// event listeners used in the code
window.addEventListener('load', function () {

    homebtn.addEventListener('click', function () {
        window.location.href = "index.html";
    });
    Clearbtn.addEventListener('click', function () {
        Inputbox.value = '';
        Taskdate.value = '';
    });
    viewMisedTasks.addEventListener('click', function () {
        veiw_and_Hide_Area(today, upcoming, completedTask, Missed);
        displayFromLocalStorage();
    });
    viewCompletedTasks.addEventListener('click', function () {
        veiw_and_Hide_Area(today, upcoming, Missed, completedTask);
        displayFromLocalStorage();
    });
    viewCurrentTasks.addEventListener('click', function () {
        today.style.height = '60vh';
        veiw_and_Hide_Area(Missed, upcoming, completedTask, today);
        displayFromLocalStorage();
    });

    id = JSON.parse(localStorage.getItem('lastId')) || 0;
    displayFromLocalStorage();
    findcurrentdate();
    updateNotification();
    Taskdate.value = currentdate;

});

document.getElementById('tasklist_30').addEventListener('click', function(event) {
    const target = event.target;
  

    const taskElement = target.closest('.task_30');
    console.log(taskElement.id,taskElement)
    if (!taskElement) return;

    const taskId = taskElement.id;

    if (target.classList.contains('menu-icon_30')) {
        const menuActions = taskElement.querySelector('.menu-actions_30');
        menuActions.classList.toggle('hidden_30');
    } else if (target.innerText === 'edit') {
        editpopup(taskId,taskElement);
    } else if (target.innerText === 'delete') {
        RemoveFromLocalStorage(taskId,taskElement);
    } else if (target.innerText === 'Done') {
        updateStatus(taskId, 'completed',taskElement);
    } else if (target.innerText === 'undo') {
        console.log('hello')
        updateStatus(taskId, 'notdone',taskElement);
    }
});


// function to displa current date


function findcurrentdate() {
    let today = new Date();

    let day = today.getDate();
    if (day < 10) day = '0' + day;

    let month = today.getMonth() + 1;  // getMonth() is zero-based
    if (month < 10) month = '0' + month;

    let year = today.getFullYear().toString(); // Get last two digits of the year

    currentdate = year + '-' + month + '-' +day ;

    return currentdate;
}


// function to provide unique id for each task
function updateid() {
    id++;
    lastId = id;
    localStorage.setItem('lastId', JSON.stringify(lastId));

}
/// function to add task
Addbtn.addEventListener('click', function () {
    let task = Inputbox.value;
    let date = Taskdate.value;
    console.log(currentdate)  
    if (task === '' || date === '') {
        alert('Please enter a task and date');
    } else if (currentdate === date) {
        createOrUpdateTask(task, date, today_container, today,null,true);

    } else if (new Date().getTime() < new Date(date).getTime()) {
        createOrUpdateTask(task, date, upcoming_container, upcoming,null,true);
    } else {
        alert('Please enter a valid date');
    }
    Inputbox.value = '';
    Taskdate.value = currentdate;
});
/// action that can be performed (ie, edit, delete, complete)



//// add to local storage function 
function AddToLocalStorage(task, date, id) {
    let taskObj = {
        task: task,
        date: date,
        id: id,
        taskstatus: 'notdone'
    };
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// function to create task element from local storage

function createTaskInnerHTML(taskname, date, where_to_add) {
    console.log(where_to_add)
    const commonHTML = `
    <div class="todo_30">
      <div>${taskname}</div>
      <div>${date}</div>
    </div>
    <div class="menu_30">
      <div class="menu-icon_30">...</div>
      <div class="menu-actions_30 hidden_30 row_30">
        <div class="action_30">delete</div>
        <div class="action_30">edit</div>
    `;
    if (where_to_add == completedTask) {
        return commonHTML + `<div class="action_30">undo</div></div></div>`;
    }
    return commonHTML + `<div class="action_30">Done</div></div></div>`;
}

// create or update function to create the element and stor in local storage and to display from local storage
function createOrUpdateTask(taskname, date, container, where_to_add, task_id = null, addToStorage = false) {
    let taskElement = document.createElement('div');
    taskElement.classList.add('task_30');
    taskElement.innerHTML = createTaskInnerHTML(taskname, date, where_to_add);

    // If a task_id is provided, use it; otherwise, use the global id.
    task_id = task_id || id;
    taskElement.setAttribute('id', task_id);

    // This line was clearing the container; remove if not intended.
    container.appendChild(taskElement);
    where_to_add.appendChild(container);

    // If the function is being used to add a task, add to localStorage and update notifications.
    if (addToStorage) {
        AddToLocalStorage(taskname, date, task_id);
        updateNotification();
        updateid();
    }
}
function isTaskAlreadyPresent(task_id) {
    return !!document.getElementById(task_id);
}


//display from  local storage function
function displayFromLocalStorage() {
    findcurrentdate();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const currentDateObj = new Date(currentdate);

    tasks.forEach(function(task) {
        const taskDateObj = new Date(task.date);

        if (isTaskAlreadyPresent(task.id)) {
            return;  // Skip this iteration if task already exists in the DOM
        }
        
        if (task.taskstatus == 'completed') {
            createOrUpdateTask(task.task, task.date, completed_container, completedTask,task.id);
        } else if (taskDateObj.getTime() === currentDateObj.getTime()) {
            createOrUpdateTask(task.task, task.date, today_container, today,task.id);
        } else if (taskDateObj > currentDateObj) {
            createOrUpdateTask(task.task, task.date, upcoming_container, upcoming,task.id);
        } else if (taskDateObj < currentDateObj) {
            createOrUpdateTask(task.task, task.date, Missed_container, Missed,task.id,);
        }
    });
}



// edit from local storage function
function editFromLocalStorage(task, date, id,taskElement) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].task = task;
            tasks[i].date = date;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskElement.remove()
    displayFromLocalStorage();
      
}
// remove from local storage function
function RemoveFromLocalStorage(id,taskElement) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskElement.remove()
    updateNotification()
}
// validate_edited info function
function validate_edited_task(task, date) {
    if (task == '' || date == '') {
        Errorpopup.style.display = 'flex';
        blur();
        ErrorMsg.innerHTML = 'Please fill all the fields';
        document.getElementById('Errorpopup_30').style.display = 'flex';
        document.getElementById('Editpopup_30').style.display = 'none';
        return false;
    } else if (currentdate == date || new Date().getTime() < new Date(date).getTime()) {
        document.getElementById('Editpopup_30').style.display = 'none';
        return true;
    }
    else {
        Errorpopup.style.display = 'flex';
        blur();
        ErrorMsg.innerHTML = 'Please enter date in the format YYYY-MM-DD';
        return false;
    }
}
// update status function
function updateStatus(id, status,taskElement) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].taskstatus = status;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskElement.remove()
    updateNotification()
}
// veiew_and_Hide_Area function
function veiw_and_Hide_Area(area1, area2, area3, area4) {
    area1.style.display = 'none';
    area2.style.display = 'none';
    area3.style.display = 'none';
    area4.style.display = 'block';

}
///  function updates number of task missed,completed, todo
function updateNotification() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let No_of_task_completed = 0;
    let No_of_task_missed = 0;
    let No_of_task_todo = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskstatus == 'completed') {
            No_of_task_completed++;
        } else if (tasks[i].taskstatus == 'notdone') {
            if (new Date().getTime() < new Date(tasks[i].date).getTime() || currentdate == tasks[i].date) {

                No_of_task_todo++;
            } else {
                No_of_task_missed++;
            }
        }
    }
    count_completed_tasks = document.querySelector('#completedtask_30');
    count_missed_tasks = document.querySelector('#pending_30');
    count_current_tasks = document.querySelector('#tocomplete_30');
    count_completed_tasks.innerHTML = "Finished:" + No_of_task_completed + "<br>view";
    count_missed_tasks.innerHTML = "Missed :" + No_of_task_missed + "<br>view";
    count_current_tasks.innerHTML = "Today :" + No_of_task_todo + "<br>view";
}


document.getElementById('yes_30').addEventListener("click", function () {
    document.getElementById('Errorpopup_30').style.display = 'none';
    document.getElementById('Editpopup_30').style.display = 'flex';
    blur();
    ErrorMsg.innerHTML = '';


})


function blur() {
    if (Errorpopup.style.display == 'flex' || document.getElementById('Editpopup_30').style.display == 'flex') {
        TaskList.classList.add('blur_30');
        document.getElementById('header_30').classList.add('blur_30');
        document.getElementById('footer_30').classList.add('blur_30');
        document.getElementById('TaskInput_30').classList.add('blur_30');
    }
    else {
        TaskList.classList.remove('blur_30');
        document.getElementById('header_30').classList.remove('blur_30');
        document.getElementById('footer_30').classList.remove('blur_30');
        document.getElementById('TaskInput_30').classList.remove('blur_30');
    }
}

/// popup that perform editing the task 
function editpopup(elementid,taskElement) {
    document.getElementById('Editpopup_30').style.display = 'flex';
    blur();
    document.getElementById('Reject_30').addEventListener("click", function () {
        document.getElementById('Editpopup_30').style.display = 'none';
        blur();
    })

    document.getElementById('confirm_30').addEventListener("click", function () {
        let task = document.getElementById('EditedTask_30').value;
        let date = document.getElementById('EditedTaskDate_30').value;
        if (validate_edited_task(task, date)) {
            editFromLocalStorage(task, date, elementid,taskElement);
            
        }
        blur();
    })
}

