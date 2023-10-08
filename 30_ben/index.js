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
//]const container = document.querySelector('.container');
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
    });
    viewCompletedTasks.addEventListener('click', function () {
        veiw_and_Hide_Area(today, upcoming, Missed, completedTask);
    });
    viewCurrentTasks.addEventListener('click', function () {
        today.style.height = '60vh';
        veiw_and_Hide_Area(Missed, upcoming, completedTask, today);
    });

    id = JSON.parse(localStorage.getItem('lastId')) || 0;
    displayFromLocalStorage();
    findcurrentdate();
    updateNotification();
    Taskdate.value = currentdate;

});

function setmenubtns() {
    var menubtns = document.getElementsByClassName('menu_30')
    for (var i = 0; i < menubtns.length; i++) {
        menubtns[i].addEventListener('click', function () {
            console.log('clicked + ' + this.parentElement.id);
            var menuoptns = this.parentElement.getElementsByClassName('menu_30')[0].getElementsByClassName('menu-actions_30')[0];
            console.log(menuoptns);
            menuoptns.classList.toggle('hidden_30');

            var editbtn = menuoptns.getElementsByClassName('action_30')[1];
            var deletebtn = menuoptns.getElementsByClassName('action_30')[0];
            var cmpltbtn = menuoptns.getElementsByClassName('action_30')[2];
            var undobtn = menuoptns.getElementsByClassName('action_30')[3];/*not working */
            var taskid = this.parentElement.id;

            editbtn.addEventListener('click', function () {
                editpopup(taskid);
            });

            deletebtn.addEventListener('click', function () {
                RemoveFromLocalStorage(taskid)
            })

            cmpltbtn.addEventListener('click', function () {
                updateStatus(taskid, 'completed');

            });

            /*  undobtn.addEventListener('click', function () {
                  updateStatus(taskid, 'notdone')
              })*/

        });


    }
}

// function to displa current date
function findcurrentdate() {
    if (new Date().getMonth() + 1 < 10) {
        currentdate = new Date().getFullYear() + '-' + "0" + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    } else {
        currentdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    }
}
/// function to add task on to screen
// Declare a variable to hold a reference to the Edit_bar element
function addTask(task, date, container, where_to_add) {
    let taskElement = document.createElement('div');
    taskElement.classList.add('task_30');
    taskElement.innerHTML = `
    <div class="todo_30"><div>${task}</div>
    <div>${date}</div></div>
    <div class="menu_30">
      <div class="menu-icon_30" id="Edit_bar_30">...</div>
      <div class="menu-actions_30 hidden_30">
        <div class="action_30" id="deletebtn_30">delete</div>
        <div class="action_30" id="editbtn_30">edit</div>
        <div class="action_30" id="cmpltbtn_30">Done</div>
      </div>
    </div>
  `;
    taskElement.setAttribute('id', id);
    container.appendChild(taskElement);
    where_to_add.appendChild(container);
    AddToLocalStorage(task, date, id);
    updateNotification();
    updateid();
}

// Access the Edit_bar element outside the function

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

    if (task === '' || date === '') {
        alert('Please enter a task and date');
    } else if (currentdate === date) {
        addTask(task, date, today_container, today);

    } else if (new Date().getTime() < new Date(date).getTime()) {
        addTask(task, date, upcoming_container, upcoming);
    } else {
        alert('Please enter a valid date');
    }
    Inputbox.value = '';
    Taskdate.value = currentdate;
    location.reload();
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
function createtasktoDisplay(taskname, date, task_id, container, where_to_add) {
    let taskElement = document.createElement('div');
    taskElement.classList.add('task_30');
    if (where_to_add == completedTask) {
        taskElement.innerHTML = `
    <div class="todo_30"><div>${taskname}</div>
    <div>${date}</div></div>
    <div class="menu_30">
      <div class="menu-icon_30" id="Edit_bar_30">...</div>
      <div class="menu-actions_30 hidden_30">
        <div class="action_30" id="deletebtn_30">delete</div>
        <div class="action_30" id="editbtn_30">edit</div>
        <div class="action_30" id="addbackbtn_30">undo</div>
      </div>
    </div>
  `;
    }
    else {
        taskElement.innerHTML = `
    <div class="todo_30"><div>${taskname}</div>
    <div>${date}</div></div>
    <div class="menu_30">
      <div class="menu-icon_30" id="Edit_bar_30">...</div>
      <div class="menu-actions_30 hidden_30">
        <div class="action_30" id="deletebtn_30">delete</div>
        <div class="action_30" id="editbtn_30">edit</div>
        <div class="action_30" id="cmpltbtn_30">Done</div>
      </div>
    </div>
  `;
    }
    taskElement.setAttribute('id', task_id);
    container.appendChild(taskElement);
    where_to_add.appendChild(container);
}
//display from  local storage function
function displayFromLocalStorage() {

    findcurrentdate();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task) {
        if (new Date().getTime() < new Date(task.date).getTime() && task.taskstatus == 'notdone' && currentdate != task.date) {
            createtasktoDisplay(task.task, task.date, task.id, upcoming_container, upcoming);
        } else if (currentdate == task.date && task.taskstatus == 'notdone') {
            createtasktoDisplay(task.task, task.date, task.id, today_container, today);
        } else if (new Date().getTime() > new Date(task.date).getTime() && task.taskstatus == 'notdone' && currentdate != task.date) {
            createtasktoDisplay(task.task, task.date, task.id, Missed_container, Missed);
        } else if (task.taskstatus == 'completed' && (new Date().getTime() < new Date(task.date).getTime() || currentdate == task.date)) {
            createtasktoDisplay(task.task, task.date, task.id, completed_container, completedTask);
        } else {
            RemoveFromLocalStorage(task.id);
        }
    });
    setmenubtns();

}
// edit from local storage function
function editFromLocalStorage(task, date, id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].task = task;
            tasks[i].date = date;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
}
// remove from local storage function
function RemoveFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
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
function updateStatus(id, status) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].taskstatus = status;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
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
        TaskList.classList.remove('blur');
        document.getElementById('header_30').classList.remove('blur_30');
        document.getElementById('footer_30').classList.remove('blur_30');
        document.getElementById('TaskInput_30').classList.remove('blur_30');
    }
}

/// popup that perform editing the task 
function editpopup(elementid) {
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
            editFromLocalStorage(task, date, elementid);
        }
    })
}

