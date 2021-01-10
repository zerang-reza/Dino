document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dino');
    const plate = document.querySelector('.plate');
    const alert = document.getElementById('alert');
    var isJumping = false;
    var gravity = 1.01;
    var isGameOver = false;


   

    function mainFunc (e){
        if (e.keyCode === 32){

            if (!isJumping){
                isJumping = true;
                jump();
            }
        }
    }

    document.addEventListener('keydown', mainFunc);

    function jump (){
        let position = 200;
        let count = 0;
        let timerId = setInterval(function (){

            // move down
            if(count == 10){
                clearInterval(timerId);
                console.log("down");
                let downTimerId = setInterval(function (){
                    position -= 20;
                    count --;
                    position = position * gravity;
                    dino.style.bottom = position + 'px'
                    if (position < 200){
                        clearInterval (downTimerId);
                        isJumping = false;
                    }
                }, 20)
            }

            // move up
            console.log("up");
            position += 20;
            count ++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        },20)
    }

    function generateObstacles (){
        let obstaclePosition = 1000;
        let randomTime = Math.random() * 4000;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        plate.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval (function(){
            if (obstaclePosition > 0 && obstaclePosition < 50 ){
                clearInterval(timerId);
                
                // alert.innerHTML = 'Game Over';
                console.log("Game Over");

                isGameOver = true;
            }
           
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
        
        },20)

        if (!isGameOver){
            setTimeout(generateObstacles, randomTime);
        }

    }

    generateObstacles();
    


})