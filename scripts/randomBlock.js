import { Block } from './blocks.js';

//let score = 0;
//const user = { maxScore: 0 };
/*const rectObject = [
    { color: "#FFC473", number: "2", probability: 50 },
    { color: "#C4C7CE", number: "4", probability: 50 },
    { color: "#C0EB6A", number: "8", probability: 15 },
    { color: "#FFE0AF", number: "16", probability: 15 },
    { color: "#C8D7D2", number: "32", probability: 10 },
    { color: "#BA89D4", number: "64", probability: 10 }
  ];*/
  const rectObject = [
    { number: "2"},
    { number: "4"},
    { number: "8"},
    { number: "16"},
    { number: "32"},
    { number: "64"}
  ];
   // Sélection aléatoire d'un objet rect dans rectObject
   //const randomRect = this.getRandomRect();
   //this.color = randomRect.color;
   //this.number = randomRect.number;
    export function getRandomRect() {
        // Sélection aléatoire d'un index dans l'intervalle [0, rectObject.length)
        const randomIndex = Math.floor(Math.random() * rectObject.length);
        
        // Retourne l'objet rect correspondant à l'index sélectionné
        return rectObject[randomIndex];
    }
    /*
    export function getRandomRect() {
        // Calcul de la somme totale des probabilités
        const totalProbability = rectObject.reduce((total, rect) => total + rect.probability, 0);

        // Sélection aléatoire d'un nombre dans l'intervalle [0, totalProbability)
        let randomNum = Math.random() * totalProbability;

        // Recherche de l'objet rect correspondant à la valeur aléatoire
        for (const rect of rectObject) {
            if (randomNum < rect.probability) {
                return rect;
            }
            randomNum -= rect.probability;
        }

        // Si aucune valeur n'est sélectionnée (ce qui ne devrait pas se produire normalement),
        // retourner la première entrée de rectObject
        return rectObject[0];
    }*/

export function mergeRectangles(rectangles,canvas,score,maxScore) {
    for (let index1 = 0; index1 < rectangles.length; index1++) {
        for (let index2 = 0; index2 < rectangles.length; index2++) {
                let rect1 = rectangles[index1];
                let rect2 = rectangles[index2];
                if (rect1.number === 32) {
                    winGame(score,maxScore);
                    //return score;
                }
                if (index1 !== index2) {

                    if (rect1.number === rect2.number && rect1.isColliding(rect2)) { // Utilisation de "this.isColliding" pour appeler la méthode depuis la même classe
                        const lowerRectIndex = rect1.y > rect2.y ? index1 : index2;
                        
                        rectangles[lowerRectIndex].number *= 2;
                        score += rectangles[lowerRectIndex].number;

                        rectangles.splice(lowerRectIndex === index1 ? index2 : index1, 1);

                        if (lowerRectIndex === index2) {
                            rect1.y = rect2.y;
                        }

                        while (rect1.y + rect1.height < canvas.height && !rectangles.some(otherRect => this.isColliding(rect1, otherRect) && otherRect !== rect1)) {
                            rect1.y += canvasId.height / 20;
                        }
                        // Ajuster index1 si un élément a été supprimé avant lui
                        if (index2 < index1) {
                            index1--;
                        }
                        
                        break;
                    }
                }
                
            }
        }
        return score;
    }
   function updateMaxScore(score,maxScore) {
        if (score > maxScore) {
            maxScore = score;
            document.getElementById("maxScore").innerText = `Votre meilleur score : ${maxScore}`;
        }
    }

   function endGame() {
        document.getElementById("gameOverNotify").style.display = "block";
        document.getElementById('playButton').disabled = false;
        document.getElementById('playButton').style.display = "block";
        cancelAnimationFrame(animationId);
        this.updateMaxScore(); // Ajout de "this." pour appeler la méthode depuis la même classe
    }

    function winGame(score,maxScore) {
        document.getElementById("gameWinNotify").style.display = "block";
        document.getElementById('playButton').disabled = false;
        document.getElementById('playButton').style.display = "block";
        //animationId = requestAnimationFrame(animate);
        updateMaxScore(score,maxScore); // Ajout de "this." pour appeler la méthode depuis la même classe
        cancelAnimationFrame(animationId);
    }
    export function drawScore(score) {
        // Met à jour le score actuel dans l'élément HTML
        let lblScore = document.getElementById("score");
        lblScore.innerText = `Ton score: ${score}`;
    
        
    }



