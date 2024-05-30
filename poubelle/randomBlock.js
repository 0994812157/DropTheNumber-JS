const rectObject = [
    { number: 2 },
    { number: 4 },
    { number: 8 },
    { number: 16 },
    { number: 32 },
    { number: 64 }
];

export function getRandomRect() {
    const randomIndex = Math.floor(Math.random() * rectObject.length);
    return rectObject[randomIndex];
}
/*
export function mergeRectangles(rectangles, canvas, score, maxScore) {
    function checkAndMerge(rect1, rect2) {
        if (rect1.number === rect2.number && rect1.isColliding(rect2)) {
            const lowerRectIndex = rect1.posY > rect2.posY ? rectangles.indexOf(rect1) : rectangles.indexOf(rect2);

            rectangles[lowerRectIndex].number *= 2;
            score += rectangles[lowerRectIndex].number;

            const higherRectIndex = lowerRectIndex === rectangles.indexOf(rect1) ? rectangles.indexOf(rect2) : rectangles.indexOf(rect1);
            rectangles.splice(higherRectIndex, 1);

            if (lowerRectIndex === rectangles.indexOf(rect2)) {
                rect1.posY = rect2.posY;
            }

            while (rect1.posY + rect1.height < canvas.height && !rectangles.some(otherRect => rect1.isColliding(otherRect) && otherRect !== rect1)) {
                rect1.posY += rect1.height / 20;
            }

            if (rect1.number === 128) {
                winGame(score, maxScore);
                return score;
            }

            return true;
        }
        return false;
    }

    function propagateMerge(rect) {
        let merged = false;

        for (let otherRect of rectangles) {
            if (rect !== otherRect) {
                if (checkAndMerge(rect, otherRect)) {
                    merged = true;
                    propagateMerge(rect);
                    break;
                }
            }
        }

        return merged;
    }

    for (let rect of rectangles) {
        while (propagateMerge(rect)) {}
    }

    return score;
}*/

export function drawScore(score) {
    let lblScore = document.getElementById("score");
    lblScore.innerText = `Ton score: ${score}`;
}

function updateMaxScore(score, maxScore) {
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
    updateMaxScore(score, maxScore);
}

function winGame(score, maxScore) {
    document.getElementById("gameWinNotify").style.display = "block";
    document.getElementById('playButton').disabled = false;
    document.getElementById('playButton').style.display = "block";
    updateMaxScore(score, maxScore);
    cancelAnimationFrame(animationId);
}
