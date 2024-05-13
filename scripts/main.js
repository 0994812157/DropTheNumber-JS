import { ControlledBlock } from './controlledBlock.js';
import { getRandomRect,mergeRectangles,drawScore } from './randomBlock.js';

document.getElementById('playButton').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById("gameOverNotify").style.display = "none";
    document.getElementById("gameWinNotify").style.display = "none";

    const canvas = document.getElementById('my-canvas');
    const ctx = canvas.getContext('2d');
    const gameBlocks = [];
    let score = 0;
    const user = { maxScore: 0 };
    let randomRect = getRandomRect();
    function createNewBlock() {
        if (!gameBlocks.length || !gameBlocks[gameBlocks.length - 1].active) {
            const xPosition = (canvas.width - 50) / 2; // Centre le bloc horizontalement
            let randomRect = getRandomRect();
            let number= randomRect.number;
            const newBlock = new ControlledBlock('my-canvas', 50, 50, xPosition, 0,'#FFC473',number);
            gameBlocks.push(newBlock);
        }
    }

    //const xPosition = (canvas.width - 50) / 2; // Centre le bloc horizontalement
   // const controlledBlock = new ControlledBlock('my-canvas', 50, 50, xPosition, 0, '#FFC473', '2', gameBlocks);
           
    //const randomBlock = new RandomBlock('my-canvas', Math.random() * 50, Math.random() * 50, 'red');

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Nettoie le canvas
          

        gameBlocks.forEach(block => {
            if (block instanceof ControlledBlock || block instanceof RandomBlock) {
                if (block.active) {
                    score = mergeRectangles(gameBlocks,canvas,score,user.maxScore); // Passer l'indice du bloc à mergeRectangles
                    //console.log (score);
                    //console.log (user.maxScore);
                }
                block.draw(); // Dessine le bloc sur le canvas
                block.fall(gameBlocks);
                drawScore(score);
            }
        });
        

        //drawScore(score);
        if (gameBlocks.some(block => block.active)) {
            requestAnimationFrame(animate); // Continue l'animation si au moins un bloc est encore actif
        } else {
            createNewBlock(); // Crée un nouveau bloc si tous sont inactifs
            requestAnimationFrame(animate); // Continue l'animation
        }
    }
    createNewBlock(); // Appel initial pour créer le premier bloc
    requestAnimationFrame(animate); // Démarrer l'animation
    
});




