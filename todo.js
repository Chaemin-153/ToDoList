const toDoForm = document.querySelector(".js-toDoForm"),
    myGoalForm = document.querySelector(".js-myGoal"),
    toDoInput = toDoForm.querySelector("input"),
    myGoalInput = myGoalForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    myGoalList = document.querySelector(".js-myGoalList");

const MYGOAL_LS = "myGoals";

let myGoals = [];

function deleteMG(event){
    const btn = event.target;
    const li = btn.parentNode;
    myGoalList.removeChild(li);
    const cleanMyGoals = myGoals.filter(function(myGoal){
        return myGoal.id !== parseInt(li.id);
    });
    myGoals = cleanMyGoals;
    saveMyGoal();
}

function saveMyGoal(){
    localStorage.setItem(MYGOAL_LS, JSON.stringify(myGoals));
}

function paintMyGoal(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = myGoals.length + 1;
    delBtn.innerText = "💡";
    delBtn.addEventListener("click", deleteMG);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    myGoalList.appendChild(li);
    const myGoalObj = {
        text: text,
        id: newId
    };
    myGoals.push(myGoalObj);
    saveMyGoal();
}

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "📌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function myGoalHandleSubmit(event){
    event.preventDefault();
    const myGoalCurrentValue = myGoalInput.value;
    paintMyGoal(myGoalCurrentValue);
    myGoalInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function loadMG(){
    const loadedMG = localStorage.getItem(MYGOAL_LS);
    if(loadedMG !== null){
        const parsedMG = JSON.parse(loadedMG);
        parsedMG.forEach(function(myGoal){
            paintMyGoal(myGoal.text);
        });
    }
}

function init(){
    loadToDos();
    loadMG();
    toDoForm.addEventListener("submit", handleSubmit);
    myGoalForm.addEventListener("submit", myGoalHandleSubmit);
}

init();