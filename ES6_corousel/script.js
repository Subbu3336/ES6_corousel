class corousel {
  constructor(corouselItem, corouselParent, slideText) {
    this.corouselItem = corouselItem;
    this.totalItems=corouselItem.length;
    this.corouselParent = corouselParent;
    this.slideText=slideText;
    this.slide= 0;
    this.moving= false;
    this.xDown=null;
    this.yDown=null;
    this.setInitialClasses();
    this.setEventListeners();
    this.setSlideDots();
    this.sliderEvents();
  }
  setInitialClasses(){
     if(this.corouselItem.length > 1){
      this.corouselItem[this.totalItems - 1].classList.add("prev");
      this.corouselItem[0].classList.add("active");
      this.corouselItem[1].classList.add("next");
    }
  }
  setEventListeners(){
    var next = this.corouselParent.getElementsByClassName('carousel__button--next')[0],
        prev = this.corouselParent.getElementsByClassName('carousel__button--prev')[0];

     if(this.totalItems > 1){
      next.addEventListener('click', () =>{this.moveNext()});
      prev.addEventListener('click', () =>{this.movePrev()});

      for (var i = 0; i < this.totalItems; i++) {
        this.corouselItem[i].addEventListener('touchstart', (e) => {this.handleTouchStart(e)}, false);        
        this.corouselItem[i].addEventListener('touchmove', (e) => {this.handleTouchMove(e)}, false);
      }

     }
  }
                                                                   
handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];                                      
    this.xDown = firstTouch.clientX;                                      
    this.yDown = firstTouch.clientY;                                      
};                                                
                                                                        

  handleTouchMove(evt) {
    if ( ! this.xDown || ! this.yDown ) {
        return;
    }

    let xDiff = this.xDown - evt.touches[0].clientX;
    let yDiff = this.yDown - evt.touches[0].clientY;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
          this.moveNext();
        } else {
           this.movePrev();
        }                       
    } 
    this.xDown = null;
    this.yDown = null;                                             
  }

  disableInteraction() {
    this.moving = true;

    setTimeout(() => {
      this.moving = false
    }, 500);
  }

  setSlideDots(){
    for (let i = 0; i < this.totalItems; i++) {
        let node = document.createElement("span");
        if(i == 0){
            node.className ="active"
        }
        node.dataset.number=i+1;
        this.corouselParent.getElementsByClassName("line-container")[0].appendChild(node);
    }
    this.corouselParent.getElementsByClassName("slideText")[0].innerHTML = this.slideText;
  }
  sliderEvents(){
    if(this.totalItems > 1){
           this.corouselParent.getElementsByClassName("line-container")[0].addEventListener("click", (e) => {
               if(e.target && e.target.tagName === "SPAN"){
                  let slide=parseInt(e.target.dataset.number) - 1;
                  this.moveCarouselTo(slide);
               }
          });
        } 
  }


 moveCarouselTo(slideValue) {
    
    if(slideValue || slideValue == 0){
      this.slide = slideValue;
    }

    if(!this.moving) {
      this.disableInteraction();

      let activeDot = this.corouselParent.querySelector(".line-container span:nth-child("+(this.slide+1)+")");
      let preActiveDot = this.corouselParent.querySelector(".line-container span.active");
      preActiveDot.classList.remove("active");
      activeDot.className="active";

      let newPrevious = this.slide - 1,
          newNext = this.slide + 1,
          oldPrevious = this.slide - 2,
          oldNext = this.slide + 2;

        if (newPrevious <= 0) {
          oldPrevious = (this.totalItems - 1);
        } else if (newNext >= (this.totalItems - 1)){
          oldNext = 0;
        }

        if (this.slide === 0) {
          newPrevious = (this.totalItems - 1);
          oldPrevious = (this.totalItems - 2);
          oldNext = (this.slide + 1);
        } else if (this.slide === (this.totalItems -1)) {
          newPrevious = (this.slide - 1);
          newNext = 0;
          oldNext = 1;
        }
        let itemClassName ="carousel__photo";
        this.corouselItem[oldPrevious].className = itemClassName;
        this.corouselItem[oldNext].className = itemClassName;

        this.corouselItem[newPrevious].className = itemClassName + " prev";
        this.corouselItem[this.slide].className = itemClassName + " active";
        this.corouselItem[newNext].className = itemClassName + " next";
    }
  }

  moveNext() {

    if (!this.moving) {

      if (this.slide === (this.totalItems - 1)) {
        this.slide = 0;
      } else {
        this.slide++;
      }
      this.moveCarouselTo();
    }
  }

  movePrev() {
    if (!this.moving) {
      if (this.slide === 0) {
        this.slide = (this.totalItems - 1);
      } else {
        this.slide--;
      }

      this.moveCarouselTo();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let itemClassName = "carousel-wrapper";
  items = document.getElementsByClassName(itemClassName);
  for (var i = 0; i < items.length; i++) {
      new corousel(items[i].getElementsByClassName("carousel__photo"),items[i], "Manage your Accounts from anywhere");
  }

});


