/*
  TODO:
  1. button to link
  2. login / sign in
  3. menu list
  5. menu time line
*/
import Storage from "./storage.js";
import MainView from "./mainView.js";
export default class App{
  static startProject(){
    MainView.viewMainNav();
    App.menu();
    App.add();
    App.remove();
  }

  static menu(){
    const menu = document.querySelector('.menu');
    menu.addEventListener('click',e=>{
      if(e.target.className === 'login'){
        MainView.viewModal('login');
      }else if(e.target.className ==='signup'){
        MainView.viewModal('signup');
      }
    });
  }
  
  static add(){
    const addList = document.querySelector('#nav .add-list');

    addList.addEventListener('click',e =>{
      MainView.contentAdd();
    });
  }

  static remove(){
    const removeContent = document.querySelector('.list-content .remove-list');

    removeContent.addEventListener('click',e=>{
      MainView.contentRemove();
    });
  }
}