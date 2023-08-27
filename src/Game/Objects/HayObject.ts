import * as PIXI from 'pixi.js';
import {Constants, Position} from "../Data/Constants";

export class HayObject {
    sprite: PIXI.Sprite;
    position: Position;
    healthRemaining: number = 100;

    constructor(position: Position) {
        this.sprite = PIXI.Sprite.from('assets/hay.png')
        this.position = position;
        this.sprite.x = position.x * Constants.BLOCK_SIZE;
        this.sprite.y = position.y * Constants.BLOCK_SIZE;
        this.sprite.width = Constants.BLOCK_SIZE;
        this.sprite.height = Constants.BLOCK_SIZE;
    }

    takeDamage(damage: number) {
        this.healthRemaining = this.healthRemaining - damage;
        // Destroy hay
        if (this.healthRemaining < 0) {
            let hayToRemove = -1;
            // Find current hay object
            for (let i = 0; i < Constants.hayObjects.length; i++) {
                let hayObject = Constants.hayObjects[i];
                if (hayObject.position.x == this.position.x && hayObject.position.y == this.position.y) {
                    hayToRemove = i;
                }
            }
            if (hayToRemove != -1) {
                // Remove hay from game scene
                Constants.hayObjects.splice(hayToRemove, 1);
                Constants.app.stage.removeChild(this.sprite);
            }
        }
    }
}
