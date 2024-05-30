import { ControlledBlock } from './controlledBlock.js';
import { getRandomRect, drawScore } from './util.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.rectangles = [];
        this.user = { maxScore: 0 };
        this.score = 0;
        this.rectWidth = 50;
        this.rectHeight = 50;
        this.numColumns = this.canvas.width / this.rectWidth;
        this.numRows = this.canvas.height / this.rectHeight;
        this.maxRectangles = this.numColumns * this.numRows;
        this.animationId = null;
    }

    launchNewRect() {
        if (this.rectangles.length < this.maxRectangles) {
            let randomRect = getRandomRect();
            const newRect = new ControlledBlock(this.canvas.id, this.rectWidth, this.rectHeight, 
                                                (this.canvas.width - this.rectWidth) / 2, 0, 
                                                randomRect.color, parseInt(randomRect.number, 10), this);
            this.rectangles.unshift(newRect);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rectangles.forEach(rect => {
            rect.draw();
        });
    }

    update() {
        let columnHeights = new Array(this.numColumns).fill(0);
        this.rectangles.forEach(rect => {
            let columnIndex = Math.floor(rect.posX / this.rectWidth);
            columnHeights[columnIndex]++;
        });

        let gameOver = columnHeights.some(height => height >= 8);
        if (gameOver) {
            this.endGame();
            return;
        }

        this.rectangles.forEach(rect => {
            if (rect.active) {
                rect.fall(this.rectangles);
            }
        });

        if (!this.rectangles.some(rect => rect.active)) {
            this.launchNewRect();
        }
    }

    mergeRectangles() {
        for (let index1 = 0; index1 < this.rectangles.length; index1++) {
            for (let index2 = 0; index2 < this.rectangles.length; index2++) {
                if (index1 !== index2) {
                    let rect1 = this.rectangles[index1];
                    let rect2 = this.rectangles[index2];

                    //console.log(`Checking collision between rect1: ${rect1.number} at (${rect1.posX}, ${rect1.posY}) and rect2: ${rect2.number} at (${rect2.posX}, ${rect2.posY})`);

                    if (rect1.number === rect2.number && rect1.isColliding(rect2)) {
                        //console.log("Collision detected and numbers are equal");

                        const lowerRectIndex = rect1.posY > rect2.posY ? index1 : index2;
                        this.rectangles[lowerRectIndex].number *= 2;
                        this.score += this.rectangles[lowerRectIndex].number;
                        this.rectangles.splice(lowerRectIndex === index1 ? index2 : index1, 1);

                        if (lowerRectIndex === index2) {
                            rect1.posY = rect2.posY;
                        }

                        while (rect1.posY + rect1.height < this.canvas.height && 
                               !this.rectangles.some(otherRect => rect1.isColliding(otherRect) && otherRect !== rect1)) {
                            rect1.posY += this.rectHeight / 20;
                        }

                        this.checkAndMergeNeighbors(rect1);

                        if (index2 < index1) {
                            index1--;
                        }
                        //console.log("ici je fusionne les blocks");

                        if (rect1.number === 8192) {
                            this.winGame();
                            return;
                        }
                        break;
                    }
                }
            }
        }
    }

    checkAndMergeNeighbors(rect) {
        // Vérification des collisions à gauche et à droite
        let leftNeighbor = this.rectangles.find(otherRect => 
            otherRect !== rect && 
            otherRect.posX + otherRect.width === rect.posX && 
            otherRect.posY === rect.posY
        );
        let rightNeighbor = this.rectangles.find(otherRect => 
            otherRect !== rect && 
            otherRect.posX === rect.posX + rect.width && 
            otherRect.posY === rect.posY
        );

        if (leftNeighbor && leftNeighbor.number === rect.number) {
            rect.number *= 2;
            this.score += rect.number;
            this.rectangles.splice(this.rectangles.indexOf(leftNeighbor), 1);
            this.checkAndMergeNeighbors(rect); // Appel récursif pour fusionner davantage
        }

        if (rightNeighbor && rightNeighbor.number === rect.number) {
            rect.number *= 2;
            this.score += rect.number;
            this.rectangles.splice(this.rectangles.indexOf(rightNeighbor), 1);
            this.checkAndMergeNeighbors(rect); // Appel récursif pour fusionner davantage
        }
    }

    endGame() {
        document.getElementById("gameOverNotify").style.display = "block";
        document.getElementById('playButton').disabled = false;
        document.getElementById('playButton').style.display = "block";
        window.cancelAnimationFrame(this.animationId);
        this.updateMaxScore();
        this.columnHeights.fill(0); // Réinitialise pour la nouvelle partie
    }

    winGame() {
        document.getElementById("gameWinNotify").style.display = "block";
        document.getElementById('playButton').disabled = false;
        document.getElementById('playButton').style.display = "block";
        window.cancelAnimationFrame(this.animationId);
        this.updateMaxScore();
        this.columnHeights.fill(0); // Réinitialise pour la nouvelle partie
    }

    updateMaxScore() {
        if (this.score > this.user.maxScore) {
            this.user.maxScore = this.score;
            document.getElementById("maxScore").innerText = `Votre meilleur score : ${this.user.maxScore}`;
        }
    }

    animate() {
        this.update();
        this.draw();
        drawScore(this.score);
        setTimeout(() => {
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        }, 5);
    }

    start() {
        this.resetGame();
        this.launchNewRect();
        this.animate();
    }
    resetGame() {
        document.getElementById("gameOverNotify").style.display = "none";
        document.getElementById("gameWinNotify").style.display = "none";
        this.rectangles = [];
        this.score = 0;
        drawScore(this.score);
    }
}
