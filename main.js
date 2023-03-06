const circles = document.querySelectorAll('.circle');
const closeButton = document.querySelector('#close');
const startButton = document.querySelector('#start');
const endButton = document.querySelector('#end');
const scoreSpan = document.querySelector('.score');
const overlay = document.querySelector('.overlay');

let score = 10;
let active = 0;
let timer = 0;
let pace = 2000;
let rounds = 0;

    circles.forEach((circle, i) => {
        circle.addEventListener('click', () => clickCircle(i));
    });

    const getRndInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const clickCircle = (circle) => {
        if (circle !== active) {
            endGame();
            return;
        }

        const enablecircles = () => {
            circles.forEach((circle) => {
                circle.style.pointerEvents = 'auto';
            });
        };

        console.log('Circle Clicked', circle);
        score += 10;
        scoreSpan.innerHTML = score;
        }

    const startGame = () => {
        if (rounds >= 3) {
            return endGame();
        }

        startButton.style.visibility = 'hidden';
        endButton.style.visibility = 'visible';


        console.log('Game Started');

        const nextActive = pickNew(active);
        active = nextActive;
        circles[nextActive].classList.toggle('active');

        console.log('Active Circle', active);

        timer = setTimeout(startGame, pace);

        pace -= 100;
        rounds++;

        console.log('Rounds', score);

        function pickNew(active) {
            const nextActive = getRndInt(0, 3);
            if (nextActive !== active) {
                return nextActive;
            } else {
                return pickNew(active);
            }

        }
    };

    const endGame = () => {
        startButton.style.visibility = 'visible';
        endButton.style.visibility = 'hidden';
        overlay.style.visibility = 'visible';
        console.log('Game Over');
        clearTimeout(timer);
    };

    const resetGame = () => {
        window.location.reload();
    };


    startButton.addEventListener('click', startGame);
    endButton.addEventListener('click', endGame);
    closeButton.addEventListener('click', resetGame);
