import * as PIXI from 'pixi.js';
import { GameConstants, Position } from "../Data/GameConstants";
import { GridObject } from "./GridObject";

/**
 * The Wall class represents a wall object on the game grid.
 * Walls are static objects that tanks cannot move through.
 */
export class Wall extends GridObject {
    sprite: PIXI.Sprite;

    constructor(position: Position) {
        super(position, {walkable: false, destroyable: false});
        this.sprite = PIXI.Sprite.from('assets/wall.png');
        this.sprite.x = position.x * GameConstants.BLOCK_SIZE;
        this.sprite.y = position.y * GameConstants.BLOCK_SIZE;
        this.sprite.width = GameConstants.BLOCK_SIZE;
        this.sprite.height = GameConstants.BLOCK_SIZE;
    }
}
