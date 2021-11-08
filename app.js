'use strict';

let dataBase = [];

//LOCALSTORAGE
const getDateBase = () => JSON.parse( localStorage.getItem('todoList')) ?? [];

const setDataBase = (dataBase) => localStorage.setItem('todoList', JSON.stringify(dataBase))

//CREATE LIST
const createList = (job, status, index) => {
    let list = document.querySelector('#todoList');
    let newList = document.createElement('label');
    newList.classList.add('todo__item');
    newList.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${job}</div>
        <input type="button" value="X" data-index=${index}>`;
    list.appendChild(newList);
}

//CLEAR JOB
const clearJob = () => {
    const todoList = document.querySelector('#todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

//UPADTE LIST
const updateList = () => {
    clearJob();
    const dataBase = getDateBase();
    dataBase.forEach( (item, index ) => createList(item.job, item.status, index));
}

//ADD LIST
const addList = () => {
    let input = document.querySelector('#item').value;
    if(input === ''){
        alert('Preencha os dados corretamente!')
        return
    }
    const dataBase = getDateBase();
    dataBase.push({'job': input, 'status': ''});
    setDataBase(dataBase)
    updateList(); 
    //CLEAR INPUT
    document.querySelector('#item').value = '';
}


//REMOVE ITEM
const removeItem = (index) => {
    const dataBase = getDateBase();
    dataBase.splice(index, 1)
    setDataBase(dataBase);
    updateList();
}

//UPDATE ITEM
const updateItem = (index) => {
    const dataBase = getDateBase();
    dataBase[index].status = dataBase[index].status === '' ? 'checked' : '';
    setDataBase(dataBase);
    updateList();
}

//CLICK ITEM
const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index); 
        updateList(); 
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
        updateList();
    }
}

//EVENTS
document.querySelector('#add').addEventListener('click', addList);
document.querySelector('#todoList').addEventListener('click', clickItem);

//UPDATE
updateList();