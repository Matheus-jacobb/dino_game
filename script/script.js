/* let: can be change || const: cant be change */

const player = document.querySelector('.player'); // Save object player at const player
const background = document.querySelector('.background'); 
let isJumping = false;
let position = 0;
let reload = false;
let obstacleCont = 0;

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
                player.style.bottom = position + 'px';
            }
             },20)
        }   
        else
            position += 20;

        player.style.bottom = position + 'px';
    }, 20) // Atualiza a cada 20ms
}

    function createObstacle() {
        const obstacle = document.createElement('div');
        let obstaclePosition = 2500;
        let randomTime = Math.random() * 6000;
        obstacleCont ++;


        obstacle.classList.add('obstacle');
        obstacle.style.left = 2500 + 'px';
        background.appendChild(obstacle);

        let leftInterval = setInterval(() => {
            if(obstaclePosition < -60){
                clearInterval(leftInterval);
                background.removeChild(obstacle);
            }
            else if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(leftInterval);
                document.body.innerHTML = '<div class = "endgame"><h1 class = "game-over">GAME OVER</h1> <h2 class= "continue"> PRESS SPACE TO CONTINUE</h2></div>'; //add HTML page (GAMEOVER)
                reload = true;                
            }
            else{
                obstaclePosition -= (10 + obstacleCont); // obstacle speed [variable]
                obstacle.style.left = obstaclePosition + 'px';
            }
        },20)

        setTimeout(createObstacle, randomTime);

    }
createObstacle();
document.addEventListener('keydown', handleKeyUp);