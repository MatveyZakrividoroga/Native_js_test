import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';


window.addEventListener('DOMContentLoaded',()=>{
    const deadline='2023-05-11';

    tabs('.tabheader__item','.tabcontent','.tabheader__items');
    modal('[data-modal]','.modal');
    timer('.timer',deadline);
    cards();
    forms('.modal','form');
    calc();
    slider({
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
