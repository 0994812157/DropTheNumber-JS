import { Game } from './game.js';

let gameInstance = null;

function handlePlayButton() {
    document.getElementById('playButton').disabled = true;
    gameInstance = new Game('my-canvas');
    gameInstance.start();
    this.disabled = true;
    
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
}

function handleHomeButton() {
    if (gameInstance) {
        gameInstance.pauseGame();
    }

    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    window.location.href = '../../acceuille.html';
}

document.getElementById('playButton').addEventListener('click', handlePlayButton);
document.getElementById('homeButton').addEventListener('click', handleHomeButton);
