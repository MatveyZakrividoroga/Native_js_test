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

export default modal;
export {showModal,hideModal};