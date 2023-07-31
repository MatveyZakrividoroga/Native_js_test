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

export default calc;