import * as PIXI from 'pixi.js';
import {Constants} from "../Data/Constants";

type Position = {
    x: number; y: number;
};

export class BulletObject {
    sprite: PIXI.Sprite;
    position: Position;

    constructor(texture: string, position: Position) {
        this.sprite = PIXI.Sprite.from(texture);
        this.position = position;
        this.sprite.x = position.x * Constants.BLOCK_SIZE;
        this.sprite.y = position.y * Constants.BLOCK_SIZE;
        this.sprite.width = Constants.BULLET_SIZE;
        this.sprite.height = Constants.BULLET_SIZE;
    }

    move(): void {
        // Update the bullet's position based on its direction and speed
    }
}
