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

export default slider;