/* 
  TODO:
  1. user table
  2. contentList match with user table
*/

export default class Storage{
  constructor(type, title, paragraph,id){
    // storage type : 1 = add / 2 = remove
    if(type === 1){
      this.content = {
        title: title,
        para: paragraph,
        updated: new Date().toISOString()
      }
      this.addInfo();
    }else{
      this.removeInfo(id);
    }
  }
  
  getAllList(){
    const lists = JSON.parse(localStorage.getItem("contentList") || "[]");
    
    return lists.sort((a,b)=>{
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  addInfo(){
    const lists = this.getAllList();
    let existing = true;
    let id = Math.floor(Math.random()*10000);

    while(existing){
      if(!lists.find(item => item.id === id)){
        existing = false;
        this.content.id = id;
      }else{ id = Math.floor(Math.random()*10000);}
    }

    lists.push(this.content);
    localStorage.setItem("contentList",JSON.stringify(lists));
  }

  removeInfo(id){
    const lists = this.getAllList();
    const newLists = lists.filter(item => item.id !== id);

    localStorage.setItem('contentList',JSON.stringify(newLists));
  }
}