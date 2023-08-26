import * as PIXI from 'pixi.js';
import {Constants} from "../Data/Constants";

type Position = {
    x: number; y: number;
};

export class WallObject {
    sprite: PIXI.Sprite;
    position: Position;

    constructor(position: Position) {
        this.sprite = PIXI.Sprite.from('assets/wall.png')
        this.position = position;
        this.sprite.x = position.x * Constants.BLOCK_SIZE;
        this.sprite.y = position.y * Constants.BLOCK_SIZE;
        this.sprite.width = Constants.BLOCK_SIZE;
        this.sprite.height = Constants.BLOCK_SIZE;
    }
}
