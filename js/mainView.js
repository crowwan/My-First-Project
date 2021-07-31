export default class view{
  constructor(title, paragraph, viewType){
    this.title = title;
    this.para = paragraph;
    
    // viewType : 1 = main 2 = create 3 = time line
    switch(viewType){
      case 1:
        this.viewMain();        
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        return false;
    }
  }

  viewMain(){
    const content = document.querySelector(".content");
    const contentTitle = content.querySelector(".content-title");
    const contentParagraph = content.querySelector('.list-content > p');
    const listContent = content.querySelector(".list-content");

    listContent.classList.add('visual');

    contentTitle.innerText = this.title;
    contentParagraph.innerText = this.para;
  }
};