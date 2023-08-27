import * as PIXI from 'pixi.js';
import {Constants, Position} from "../Data/Constants";

export class WallObject {
    sprite: PIXI.Sprite;
    position: Position;

    constructor(position: Position) {
        this.sprite = PIXI.Sprite.from('assets/wall.png')
        this.sprite.x = position.x * Constants.BLOCK_SIZE;
        this.sprite.y = position.y * Constants.BLOCK_SIZE;
        this.sprite.width = Constants.BLOCK_SIZE;
        this.sprite.height = Constants.BLOCK_SIZE;
        this.position = position;
    }
}
