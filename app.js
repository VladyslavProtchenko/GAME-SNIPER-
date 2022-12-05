const start = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list');
const timeItem = document.querySelector('#time');
const board = document.querySelector('#board');

const color = ['#ff0000','#0062ff','#00ffaa','#ff0095','#7b00ff','#fff06c','black','blue',,'#ff6a00','#fffb00','#50ff06'];


let time = 0;
let score =0;

start.addEventListener('click',(event)=>{
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('value'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click',(event)=>{
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove();
        createRandomCircle();
    }
})

function setRandomColor(){
    const randomColor = Math.floor(Math.random()* color.length);
    return color[randomColor];
}
function getRandomNumber(min,max){
    const random =  Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}



function startGame(){

    setInterval(()=>{
        --time
        if(time<=-1){
            return endGame();
            
        } else if(time<10){
            timeItem.innerHTML = `00:0${time}`
        } else { 
            timeItem.innerHTML = `00:${time}` }
    },1000)
    createRandomCircle();
}

function endGame(){
    if(score<20) { 
        board.innerHTML = `Лох! <br/>пиздец:${score} очка<h2 class='restart'>Заново!<h2/>`;
    } else if(score < 50) {
        board.innerHTML = `Все равно лох <br/> очки:${score}<h2 class='restart'>Заново!<h2/>`;
    } else {
        board.innerHTML = `Молодцом парень <br/> очки: ${score}<h2 class='restart'>Заново!<h2/>`;
    }
    const restart = document.querySelector('.restart');
    
    restart.addEventListener('click',()=>{
        location.reload();
    })
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(20,60);
    let randomColors = setRandomColor();
    const {width, height} = board.getBoundingClientRect();
    
    const x =  getRandomNumber(0,height-size);
    const y =   getRandomNumber(0,width-size);

    

    circle.classList.add('circle');
    circle.style.backgroundColor = randomColors;
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${y}px`
    circle.style.top = `${x}px`
    board.append(circle);
}

