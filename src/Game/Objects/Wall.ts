import * as PIXI from 'pixi.js';
import { Constants, Position } from "../Data/Constants";
import { GridObject } from "./GridObject";

export class Wall extends GridObject {
    sprite: PIXI.Sprite;

    constructor(position: Position) {
        super(position, {walkable: false, destroyable: false});
        this.sprite = PIXI.Sprite.from('assets/wall.png');
        this.sprite.x = position.x * Constants.BLOCK_SIZE;
        this.sprite.y = position.y * Constants.BLOCK_SIZE;
        this.sprite.width = Constants.BLOCK_SIZE;
        this.sprite.height = Constants.BLOCK_SIZE;
    }
}
