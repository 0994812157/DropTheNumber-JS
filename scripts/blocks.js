// block.js
    //var score = 0;
   
export class Block {
    constructor(canvasId, width, height, x, y, color, number) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.posX = x;
        this.posY = y;
        this.color = color;
        this.number = number;
        this.active = true; // Indique si le bloc est actif et en descente
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(this.number, this.posX + this.width / 4, this.posY + this.height / 2);
    }

    isColliding(otherBlock) {
        return this.posX < otherBlock.posX + otherBlock.width &&
               this.posX + this.width > otherBlock.posX &&
               this.posY + this.height > otherBlock.posY &&
               this.posY < otherBlock.posY + otherBlock.height;
    }
    /*
    mergeRectangles(rectangles) {
        for (let index1 = 0; index1 < rectangles.length; index1++) {
            for (let index2 = 0; index2 < rectangles.length; index2++) {
                    if (index1 !== index2) {
                        let rect1 = rectangles[index1];
                        let rect2 = rectangles[index2];

                        if (rect1.number === rect2.number && this.isColliding(rect2)) { // Utilisation de "this.isColliding" pour appeler la méthode depuis la même classe
                            const lowerRectIndex = rect1.y > rect2.y ? index1 : index2;

                            rectangles[lowerRectIndex].number *= 2;
                            score += rectangles[lowerRectIndex].number;

                            rectangles.splice(lowerRectIndex === index1 ? index2 : index1, 1);

                            if (lowerRectIndex === index2) {
                                rect1.y = rect2.y;
                            }

                            while (rect1.y + rect1.height < this.canvas.height && !rectangles.some(otherRect => this.isColliding(rect1, otherRect) && otherRect !== rect1)) {
                                rect1.y += this.height / 20;
                            }
                            // Ajuster index1 si un élément a été supprimé avant lui
                            if (index2 < index1) {
                                index1--;
                            }
                            if (rect1.number === 128) {
                                //this.winGame(score);
                                return;
                            }
                            break;
                        }
                    }
                }
            }
        }*/
}


