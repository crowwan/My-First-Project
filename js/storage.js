export default class Storage{
  static getAllList(user){
    const lists = JSON.parse(localStorage.getItem(`contentList_${user}`) || "[]");
    
    return lists.sort((a,b)=>{
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static addInfo(title, paragraph, user){
    const content = {};
    const lists = Storage.getAllList(user);
    let existing = true;
    let id = Math.floor(Math.random()*10000);

    content.title = title;
    content.para = paragraph;
    while(existing){
      if(!lists.find(item => item.id === id)){
        existing = false;
        content.id = id;
      }else{ id = Math.floor(Math.random()*10000);}
    }

    lists.push(content);
    localStorage.setItem(`contentList_${user}`,JSON.stringify(lists));
  }

  static removeInfo(id,user){
    const lists = Storage.getAllList(user);
    const newLists = lists.filter(item => item.id !== id);

    localStorage.setItem(`contentList_${user}`,JSON.stringify(newLists));
  }
  
  static getUser(){
    const users = JSON.parse(localStorage.getItem("users")||"[]");

    return users;
  }

  static addUser(username, password){
    if(!username || !password) return false;

    const users = Storage.getUser();
    const existing = users.find(user=>user.username === username);
    const newUser = {
      username : username,
      password : password
    };

    if(existing) return false;

    users.push(newUser);
    localStorage.setItem("users",JSON.stringify(users));
    
    localStorage.setItem(`contentList_${username}`,"[]");
    return true;
  }

  static removeUser(username, password){
    const users = Storage.getUser();
    const newUsers = users.filter(user =>!(user.username === username && user.password === password));

    localStorage.setItem("users",JSON.stringify(newUsers));
    localStorage.removeItem(`contentList_${username}`);
  };
  static clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
  }
  
  static matchUser(username, password){
    const users = Storage.getUser();
    let flag = false;
    users.forEach(user => {
      if(user.username === username && user.password === password) flag = true;
    });
    return flag;
  }

  static loginUser(username, password){
    if(!Storage.matchUser(username,password)) return false;
    const userInfo = {
      username: username,
      password: password
    }
    sessionStorage.setItem('user', JSON.stringify(userInfo));
    return true;
  }
}