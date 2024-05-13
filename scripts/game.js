//scripts/game.js
import { GameManager } from './gameManager.js';

document.getElementById('playButton').addEventListener('click', function() {
    this.disabled = true;

    const gameManager = new GameManager();
    gameManager.setGameEnvironment(350, 350);
    gameManager.launchNewRect();
    function animate() {
        gameManager.update();
        gameManager.uiManager.updateScoreDisplay();
        requestAnimationFrame(animate);
    }
    animate();
});

