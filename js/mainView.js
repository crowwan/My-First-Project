import Storage from "./storage.js";

export default class MainView{
  static viewMainNav(){
    const nav = document.querySelector('#nav');
    const navHeader = nav.querySelector('.header');
    const listContainer = nav.querySelector('.items');
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (!currentUser){
      navHeader.innerText = 'NOT USER';
      return false;
    }
    const userList = Storage.getAllList(currentUser.username);
    const content = document.querySelector('.content');
    const contentBox = content.querySelectorAll('.content-box');
    content.firstElementChild.innerText = "";

    contentBox.forEach(content => content.classList.remove('visual'));
    
    navHeader.innerText = 'LIST';
    listContainer.parentNode.classList.add('show');

    while(listContainer.hasChildNodes()){
      listContainer.removeChild(listContainer.firstChild);
    }

    userList.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('item');
      li.dataset.id = item.id;
      li.innerText = item.title;
      listContainer.appendChild(li);
    });

    listContainer.addEventListener('click',e => {
      if(e.target === listContainer) return false;
      for (const child of Array.from(listContainer.children)){
        child.classList.remove('selected');
      }
      e.target.classList.add('selected');
      MainView.viewMainContent(e.target);
      
    });
  }

  static viewMainContent(target){
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const viewItem = Storage.getAllList(currentUser.username).filter(item => item.id.toString() === target.dataset.id)[0];
    const content = document.querySelector('.content');
    const contentTitle = content.querySelector('.content-title');
    const contentBox = content.querySelectorAll('.content-box');
    const listContent = content.querySelector('.list-content');
    const paragraph = listContent.querySelector('p');

    paragraph.innerText = viewItem.para;
    contentBox.forEach(box=>box.classList.remove('visual'));
    listContent.classList.add('visual');
    contentTitle.innerText = viewItem.title;
    paragraph.innerText = viewItem.para;
  }

  static viewTimeline(){
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const userList = Storage.getAllList(currentUser.username);
    const nav = document.querySelector('#nav');
    const navHeader = nav.querySelector('.header');
    const listContainer = nav.querySelector('.items');

    navHeader.innerText = 'TIME LINE';
  }

  static viewModal(type){
    const modal = document.querySelector('.modal');
    const modalBox = modal.querySelector(`.${type}`);
    const username = modalBox.querySelector('.username');
    const password = modalBox.querySelector('.password');
    const errorMsg = modalBox.querySelector('.error');
    username.value = "";
    password.value = "";
    errorMsg.style.display = 'none';
    
    modal.classList.add('show');
    modalBox.classList.add('show');
    username.focus();
    modal.addEventListener('click',e=>{
      e.preventDefault();
      if(e.target === modal){
        e.target.classList.remove('show');
        modalBox.classList.remove('show');
      }
      
      if(e.target.classList.contains('btn__login')){
        console.log('log in click');
        if(!Storage.loginUser(username.value, parseInt(password.value))){
          errorMsg.style.display = 'block';
          username.value = "";
          password.value = "";
        }else{
          modal.classList.remove('show');
          modalBox.classList.remove('show');
          MainView.viewMainNav();
        }
      }else if(e.target.classList.contains('btn__signup')){
        if(!Storage.addUser(username.value,parseInt(password.value)))
          errorMsg.style.display = 'block';
        else{
          modal.classList.remove('show');
          modalBox.classList.remove('show');
        }
      }
    })
  }
  
  static contentAdd(){
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const nav = document.querySelector('#nav');
    const navHeader = nav.querySelector('.header');
    const listContainer = nav.querySelector('.items');
    const content = document.querySelector('.content');
    const contentBox = content.querySelectorAll('.content-box');
    const contentAdd = content.querySelector('.content-add');
    const title = contentAdd.querySelector('input.title');
    const para = contentAdd.querySelector('.content-item');
    const addButton = contentAdd.querySelector('.add-list');
    
    contentBox.forEach(box=>box.classList.remove('visual'));
    contentAdd.classList.add('visual');
    navHeader.innerText = 'ADD LIST'
    listContainer.parentNode.classList.remove('show');

    addButton.addEventListener('click',e=>{
      e.preventDefault();
      Storage.addInfo(title.value,para.value,currentUser.username);
      MainView.viewMainNav();
    });
  }

  static contentRemove(){
    const selected = document.querySelector('.selected');
    const currentUser = JSON.parse(sessionStorage.getItem('user'));

    if(confirm("Do you really want to delete?")){
      Storage.removeInfo(parseInt(selected.dataset.id),currentUser.username);
      MainView.viewMainNav();
    }
  }
};