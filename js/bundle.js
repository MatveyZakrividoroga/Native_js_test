/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const result=document.querySelector('.calculating__result span'),
      genderChoose=document.querySelector('.calculating__choose','#gender'),
      gender=genderChoose.querySelectorAll('.calculating__choose-item'),
      physicalAct=document.querySelector('.calculating__choose.calculating__choose_big'),
      activity=physicalAct.querySelectorAll('.calculating__choose-item'),
      inputContainer=document.querySelector('.calculating__choose.calculating__choose_medium');

let sex,height,weight,age,ratio;

if(localStorage.getItem('sex')){
    sex=localStorage.getItem('sex');
} else{
    sex='female';
    localStorage.setItem('sex','female');
}
if(localStorage.getItem('ratio')){
    ratio=localStorage.getItem('ratio');
} else{
    ratio=1.375;
    localStorage.setItem('ratio',1.375);
}

function initLocalSettings(elements){
    removeClassActivie(elements);
    elements.forEach(elem=>{
        if(elem.getAttribute('id')===localStorage.getItem('sex')){
        elem.classList.add('calculating__choose-item_active');
        }
        if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
        elem.classList.add('calculating__choose-item_active');
        }
    });
}

initLocalSettings(gender);
initLocalSettings(activity);

function removeClassActivie(arr){
    arr.forEach(element=>{
        element.classList.remove('calculating__choose-item_active');
    });
}


function getDynamicInfo(parent){
    parent.addEventListener('input',e=>{
        const target=e.target;
    if(target.value.match(/\D/g)){
        target.style.border='1px solid red';
    } else{
        target.style.border='none';
    }
        if(target.id=="height"){
            height=+target.value;
        }
        if(target.id=="weight"){
            weight=+target.value;
        }
        if(target.id=="age"){
            age=+target.value;
        }
        calcTotal();
    });
}

function getStaticInfo(parent,son){
    parent.addEventListener('click',(e)=>{
    const target=e.target;
    if(e.target!=parent){
        removeClassActivie(son);
        e.target.classList.add('calculating__choose-item_active');
        if(target.getAttribute('data-ratio')){
            ratio=+target.getAttribute('data-ratio');
            localStorage.setItem('ratio',+target.getAttribute('data-ratio'));
        } else{
            sex=target.getAttribute('id');
            localStorage.setItem('sex',target.getAttribute('id'));
        }
        }
        calcTotal();
        });
}
getStaticInfo(genderChoose,gender);
getStaticInfo(physicalAct,activity);
getDynamicInfo(inputContainer);


function calcTotal(){
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent='____';
        return;
    }
    if(sex==='female'){
        result.textContent=Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else{
        result.textContent=Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
    class MenuCards{
        constructor(image,subtitle,describe,cost,alt,parentSelector,...classes){
            this.alt=alt;
            this.image=image;
            this.subtitle=subtitle;
            this.describe=describe;
            this.cost=cost;
            this.transfer=2.5;
            this.classes=classes;
            this.parentSelector=parentSelector;
            this.changeToByn();
        }
        changeToByn(){
            this.cost=this.cost*this.transfer;
        }
        createCard(){
            let menuItem=document.createElement('div');
            this.classes.forEach(element=>{
                menuItem.classList.add(element);
            });
            this.parentSelector.append(menuItem);
            menuItem.innerHTML=`<img src=${this.image} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.describe}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.cost}</span> byn/день</div>
            </div>`;
        }
    }
    const container=document.querySelector('.menu__field .container');
   
   
   /* getResourse('http://localhost:3000/menu')
   .then(data=>{
       data.forEach(({img,altimg,title,descr,price})=>{
           new MenuCards(img,title,descr,price,altimg,container,'menu__item').createCard();
       });
   }); */
   axios.get('http://localhost:3000/menu')
   .then(data=>{
       data.data.forEach(({img,altimg,title,descr,price})=>{
           new MenuCards(img,title,descr,price,altimg,container,'menu__item').createCard();
       });
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(modalSelector,formSelector){
    const message={
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    
    const forms=document.querySelectorAll(formSelector);
    forms.forEach(item=>{
        bindpostData(item);
    });
   
   
   
    function bindpostData(form){
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
    
        const statusMessage=document.createElement('img');
        statusMessage.src=message.loading;
        statusMessage.style.cssText=`
        display:block;
        margin:0 auto;
        `;
        form.insertAdjacentElement('afterend',statusMessage);
        
        const formData=new FormData(form);
   
        const json=JSON.stringify(Object.fromEntries(formData.entries()));
   
   
        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
        .then(data=>{
           console.log(data);
           showThanksModal(message.success); 
           statusMessage.remove();
        })
        .catch(()=>{
           showThanksModal(message.failure);
        }).finally(()=>{
           form.reset();
        });
        });
    }
   
    function showThanksModal(message){
       const prevModalDialog= document.querySelector('.modal__dialog');
       prevModalDialog.classList.add('hide');
       (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(modalSelector);
       const thanksModal=document.createElement('div');
       thanksModal.classList.add('modal__dialog');
       thanksModal.innerHTML=`
       <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
       </div>
       `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(()=>{
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)(modalSelector);
    },4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector){
    const modal=document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
    //clearInterval(modalTimer);
}
function hideModal(modalSelector){
    const modal=document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow='';
}

function modal(triggerSelector,modalSelector){
    const modalTrigger=document.querySelectorAll(triggerSelector),
      modal=document.querySelector(modalSelector);


modalTrigger.forEach(element=>{
    element.addEventListener('click',()=>{
    showModal(modalSelector);
    });
});
modal.addEventListener('click',e=>{
    if(e.target==modal ||e.target.getAttribute('data-close')==''){
    hideModal(modalSelector);
    }
});

modal.addEventListener('click',e=>{
    if(e.target===modal){
    hideModal(modalSelector);
    }
});
document.addEventListener('keydown',e=>{
    if(e.code==='Escape'){
    hideModal(modalSelector);
    }
});
/* const modalTimer=setTimeout(()=>{
    showModal(modal);
},5000); */

function showModalByScroll(){
    if (document.documentElement.scrollTop+document.documentElement.clientHeight>=document.documentElement.scrollHeight){
        showModal(modalSelector);
        window.removeEventListener('scroll',showModalByScroll);
    }
}
window.addEventListener('scroll',showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container,slide,nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}){
    const slides=document.querySelectorAll(slide),
      slider=document.querySelector(container),
      prev=document.querySelector(prevArrow),
      next=document.querySelector(nextArrow),
      total=document.querySelector(totalCounter),
      current=document.querySelector(currentCounter),
      slidesWrapper=document.querySelector(wrapper),
      slidesField=document.querySelector(field),
      width=window.getComputedStyle(slidesWrapper).width;
let slideIndex=1;
let offset=0;

current.textContent=`0${slideIndex}`;

slidesField.style.width=100*slides.length+'%';
slidesField.style.display='flex';
slidesField.style.transition='0.5s all';
slidesWrapper.style.overflow='hidden';


slides.forEach(slide=>{
    slide.style.width=width;
});

slider.style.position='relative';

const indicators=document.createElement('ol'),
      dots=[];

indicators.classList.add('carousel-indicators');
indicators.style.cssText=`
position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;   
`;
slider.append(indicators);

for(let i=0; i<slides.length;i++){
    const dot=document.createElement('li');
    dot.setAttribute('data-slide-to',i+1);
    dot.style.cssText=`
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if(i==0){
        dot.style.opacity=1;
    }
    indicators.append(dot);
    dots.push(dot);
}

function moveDots(dots){
    dots.forEach(dot=>dot.style.opacity='0.5');
    dots[slideIndex-1].style.opacity=1;
}

function getWidth(width){
    const reg=/\D/g;
    return +width.replace(reg,'');
}


next.addEventListener('click',(e)=>{
    if(offset == getWidth(width)*(slides.length-1)){
        offset=0;
        slideIndex=1;
    } else{
        offset+= getWidth(width);
        slideIndex+=1;
    }
    slidesField.style.transform=`translateX(-${offset}px)`;
    current.textContent=`0${slideIndex}`;

    moveDots(dots);
});

prev.addEventListener('click',(e)=>{
    if(offset==0){
        offset= getWidth(width)*(slides.length-1);
        slideIndex=slides.length;
    } else{
        offset-= getWidth(width);
        slideIndex-=1;
    }
    slidesField.style.transform=`translateX(-${offset}px)`;
    
    current.textContent=`0${slideIndex}`;

    moveDots(dots);
});

dots.forEach(dot=>{
    dot.addEventListener('click',(e)=>{
        const slideTo=e.target.getAttribute('data-slide-to');
        slideIndex=slideTo;

        offset= getWidth(width)*(slideTo-1);

        slidesField.style.transform=`translateX(-${offset}px)`;

        current.textContent=`0${slideIndex}`;

        moveDots(dots);
    });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector,tabsContentSelector,tabsParentSelector){
    const tabs=document.querySelectorAll(tabsSelector),
    tabsContent=document.querySelectorAll(tabsContentSelector),
    tabsParent=document.querySelector(tabsParentSelector);

function hideTabContent(){
  tabsContent.forEach(item=>{
      item.classList.add('hide');
      item.classList.remove('show','fade');
  });
  tabs.forEach(item=>{
      item.classList.remove('tabheader__item_active');
  });
}
function showTabContent(i=0){
  tabsContent[i].classList.add('show','fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add('tabheader__item_active');
}
hideTabContent();
showTabContent();

tabsParent.addEventListener('click',event=>{
  const target=event.target;
  if(target && target.classList.contains('tabheader__item')){
      tabs.forEach((item,i)=>{
          if(item==target){
              hideTabContent();
              showTabContent(i);
          }
      });
  }
});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id,deadline){
    
    function getTimeRamaining(endtime){
        let days,hours,minutes,seconds;
        const t=Date.parse(endtime)-Date.parse(new Date());
        if(t<=0){
                days=0;
                hours=0;
                minutes=0;
                seconds=0;
            
        } else{
              days=Math.floor(t/(1000*60*60*24));
              hours=Math.floor((t/(1000*60*60))%24);
              minutes=Math.floor((t/(1000*60))%60);
              seconds=Math.floor((t/(1000))%60);
        }
    
    return {
        total:t,
        days:days,
        hours:hours,
        minutes:minutes,
        seconds:seconds
    };
        
    }
    
    function getZero(num){
        if(num>=0 && num<10){
            return `0${num}`;
        } else {return num;}
    }
    
    function setClock(selector,endtime){
        const timer=document.querySelector(selector),
              days=timer.querySelector('#days'),
              hours=timer.querySelector('#hours'),
              minutes=timer.querySelector('#minutes'),
              seconds=timer.querySelector('#seconds'),
              timeInterval=setInterval(updateClock,1000);
    
        updateClock();
    
        function updateClock(){
        const t=getTimeRamaining(endtime);
        days.innerHTML=getZero(t.days);
        hours.innerHTML=getZero(t.hours);
        minutes.innerHTML=getZero(t.minutes);
        seconds.innerHTML=getZero(t.seconds);
    
        if(t.total<=0){
            clearInterval(timeInterval);
        }
        }
    }
    setClock(id,deadline);
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData=async (url,data)=>{
    const res=await fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:data
    });
    return await res.json();
};

const getResourse=async (url)=>{
    const res=await fetch(url);
    if(!res.ok){
       throw new Error(`Could not fetch ${url}, ststus: ${res.status}`);
    }
    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded',()=>{
    const deadline='2023-05-11';


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer',deadline);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal','form');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container:'.offer__slider',
        nextArrow:'.offer__slider-next',
        prevArrow:'.offer__slider-prev',
        slide:'.offer__slide',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });

});






})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map