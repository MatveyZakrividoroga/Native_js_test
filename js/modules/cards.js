import { getResourse } from "../services/services";

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

export default cards;