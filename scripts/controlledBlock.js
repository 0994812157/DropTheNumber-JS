import { Block } from './blocks.js';

export class ControlledBlock extends Block {
    constructor(canvasId, width, height, x, y, color, number, game) {
        super(canvasId, width, height, x, y, color, number);
        this.game = game;
        this.fallSpeed = 2; // Vitesse de descente
        this.active = true;
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if (!this.active) {
            return; // Si le bloc n'est pas actif, ignore les commandes
        }
        switch (event.key) {
            case 'ArrowLeft':
                // Déplace le bloc à gauche sans sortir du canvas
                this.posX = Math.max(0, this.posX - this.width);
                break;
            case 'ArrowRight':
                // Déplace le bloc à droite sans sortir du canvas
                this.posX = Math.min(this.canvas.width - this.width, this.posX + this.width);
                break;
        }
    }

    fall(blocks) {
        if (this.active) {
            // Vérifier si le bloc entre en collision avec un autre bloc en dessous
            const blocksBelow = blocks.filter(block =>
                block !== this && // Ne pas vérifier la collision avec lui-même
                block.posY > this.posY && // Vérifier uniquement les blocs en dessous
                this.isColliding(block) // Vérifier la collision
            );

            if (blocksBelow.length === 0) {
                // Si aucun bloc en dessous, continuer à tomber
                this.posY += this.fallSpeed;
            } else {
                // S'arrêter au-dessus du bloc le plus bas
                const lowestBlock = blocksBelow.reduce((lowest, current) =>
                    current.posY < lowest.posY ? current : lowest
                );
                this.posY = lowestBlock.posY - this.height;
                this.active = false; // Désactiver le bloc
                this.game.mergeRectangles(); // Fusionner les blocs après l'arrêt
            }

            // Vérifier si le bloc atteint le bas du canvas
            if (this.posY + this.height >= this.canvas.height) {
                this.posY = this.canvas.height - this.height;
                this.active = false; // Désactiver le bloc
                this.game.mergeRectangles(); // Fusionner les blocs après l'arrêt
            }
        }
    }
}
