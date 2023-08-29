import * as PIXI from 'pixi.js';
import { GameConstants, Position } from "../Data/GameConstants";
import { GridObject } from "./GridObject";

interface TakesDamage {
    takeDamage(damage: number): void;
}

/**
 * The Hay class represents a hay object on the game grid.
 * Hays are static objects that tanks cannot move through.
 */
export class Hay extends GridObject implements TakesDamage {
    sprite: PIXI.Sprite;
    healthRemaining: number = 100;

    constructor(position: Position) {
        super(position, { walkable: false, destroyable: true });
        this.sprite = PIXI.Sprite.from('assets/hay.png');
        this.sprite.x = position.x * GameConstants.BLOCK_SIZE;
        this.sprite.y = position.y * GameConstants.BLOCK_SIZE;
    }

    public takeDamage(damage: number) {
        this.healthRemaining -= damage;
        if (this.healthRemaining <= 0) {
            this.destroyHay();
        }
    }

    private destroyHay() {
        const hayToRemove = this.findHayToRemove();
        if (hayToRemove != -1) {
            GameConstants.hays.splice(hayToRemove, 1);
            GameConstants.app.stage.removeChild(this.sprite);
            GameConstants.grid.freePosition(this.position);
        }
    }

    private findHayToRemove(): number {
        return GameConstants.hays.findIndex((hay) => hay.position.x === this.position.x && hay.position.y === this.position.y);
    }
}
