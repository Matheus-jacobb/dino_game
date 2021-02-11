/* let: can be change || const: cant be change */

const dino = document.querySelector('.dino'); // Save object dino at const dino
const background = document.querySelector('.background'); 
let isJumping = false;
let position = 0;
let reload = false;
let cactusCont = 0;

function handleKeyUp(event){
    if (event.keyCode == 32){ // KeyCode of space (www.keycode.info)
        if(!isJumping)
            jump();
        if (reload == true)
            window.location.reload(false); // Refresh window to restart game
    }
}

function jump (){
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150){
            clearInterval(upInterval);

            //Descer
            let downInterval = setInterval(() =>{
            if(position <=0){
                clearInterval(downInterval);
                isJumping = false;
            }
            else{
                position -= 20;
                dino.style.bottom = position + 'px';
            }
             },20)
        }   
        else
            position += 20;

        dino.style.bottom = position + 'px';
    }, 20) // Atualiza a cada 20ms
}

    function createCactus() {
        const cactus = document.createElement('div');
        let cactusPosition = 2500;
        let randomTime = Math.random() * 6000;
        cactusCont ++;


        cactus.classList.add('cactus');
        cactus.style.left = 2500 + 'px';
        background.appendChild(cactus);

        let leftInterval = setInterval(() => {
            if(cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            }
            else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
                clearInterval(leftInterval);
                document.body.innerHTML = '<div class = "endgame"><h1 class = "game-over">GAME OVER</h1> <h2 class= "continue"> PRESS SPACE TO CONTINUE</h2></div>'; //add HTML page (GAMEOVER)
                reload = true;                
            }
            else{
                cactusPosition -= (10 + cactusCont); // cactus speed [variable]
                cactus.style.left = cactusPosition + 'px';
            }
        },20)

        setTimeout(createCactus, randomTime);

    }
createCactus();
document.addEventListener('keydown', handleKeyUp);