/* Author: Dennis Paixão */
const state = {
    velocity: 4000,
    images: [
        {
            src: 'https://cdn.pixabay.com/photo/2020/08/26/15/41/bride-5519805_960_720.jpg',
            active: false
        },
        {
            src: 'https://cdn.pixabay.com/photo/2021/12/08/11/01/glob-urs-6855367_960_720.jpg',
            active: false
        },
        {
            src: 'https://cdn.pixabay.com/photo/2017/07/28/00/57/bank-2547356_960_720.jpg',
            active: false
        },
        {
            src: 'https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_960_720.jpg',
            active: true
        }
          
       
    
    ]
    ,
    previousImg: null,
    interval: null,

   
    desActive(){

        for (let img in state.images) {
            if (state.images[img].active) {
                state.images[img].active = false;
            }
        }
        
    },
    activeIndex(index){
        this.desActive();
        state.images[index].active = true;
    },

    previous() {
        let index = 0;
        for (let img in state.images) {
            if (state.images[img].active) {
                index = parseInt(img);
            }
        }
        state.images[index].active = false;
        let nextIndex = state.images.length - 1;
        if (index - 1 >= 0) {
            nextIndex = index - 1;
        }
        this.images[nextIndex].active = true;
    },
    next() {
        let index = 0;
        for (let img in state.images) {
            if (state.images[img].active) {
                index = parseInt(img);
            }
        }
        state.images[index].active = false;
        let nextIndex = 0;
        if (index + 2 <= state.images.length) {
            nextIndex = index + 1;
        }
        this.images[nextIndex].active = true;
    }

}


function insertNavigation() {
    const slider = document.querySelector(".slider");
    const nextButton = document.createElement("a");
    nextButton.setAttribute("href", "#");
    nextButton.innerHTML = ">";
    nextButton.classList.add('next');
    slider.appendChild(nextButton);
    nextButton.addEventListener('click', () => {
        start(state.velocity);
    })

    const previousButton = document.createElement("a");
    previousButton.setAttribute("href", "#");
    previousButton.innerHTML = "<";
    previousButton.classList.add('previous');
    slider.appendChild(previousButton);
    previousButton.addEventListener('click', () => {
        state.previous(); //chamamos a função state.previous 2 vezes pois chamamos já função next() no corpo da função showActive();
        state.previous();
        start(state.velocity);
    })


        const divCircles = document.createElement("div");
        divCircles.classList.add('circles');
        for (let img in state.images) {
            let circle = document.createElement("div");
            if (state.images[img].active) {
                circle.classList.add('circle');
            } else {
                circle.classList.add('circleBorder');
            }
            divCircles.appendChild(circle);
            circle.addEventListener('click',()=>{
                console.log(img);
                state.activeIndex(img);
                console.log(state.images);
                start(state.velocity);
                
           
            });
       
        }  
        
 
        slider.appendChild(divCircles);
    
       
    

   
}

function showActive(vel) {

    const slider = document.querySelector(".slider");
    slider.innerHTML = "";
    const img = document.createElement('div');
    const pic = document.createElement('img');


    const active = state.images.filter((i) => i.active)[0];
    pic.setAttribute("src", active.src);
    const sliderWidth = slider.offsetWidth;
    img.style.width = sliderWidth + "px";
    const sliderHeight = slider.offsetHeight;
    img.style.height = sliderHeight + "px";
    img.style.display = "block";
    img.style.position = "absolute";
    img.style.background = "black";
    img.style.backgroundImage = `url(${active.src})`;
    img.style.backgroundRepeat = 'no-repeat';
    if (pic.width > pic.height) {
        img.style.backgroundSize = "100% auto";
    } else {
        img.style.backgroundSize = "auto 100%";
    }

    img.style.backgroundPosition = "center";

    if (state.previousImg !== null) {
        slider.appendChild(state.previousImg);
        state.previousImg.style.animation = `byeFade ${vel / 2}ms 1`;
    }
    slider.appendChild(img);
    img.style.animation = `nextFade ${vel / 2}ms 1`;
    state.previousImg = img;
    insertNavigation();
    state.next();
    

}

function start(vel) {
    if (state.interval !== null) {
        clearInterval(state.interval);
    }
    showActive();
    state.interval = setInterval(() => {
        showActive(vel);

    }, vel)

}

start(state.velocity);

window.addEventListener('resize', start(state.velocity));