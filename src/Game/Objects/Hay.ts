import * as PIXI from 'pixi.js';
import { Constants, Position } from "../Data/Constants";
import { GridObject } from "./GridObject";

interface TakesDamage {
    takeDamage(damage: number): void;
}

export class Hay extends GridObject implements TakesDamage {
    sprite: PIXI.Sprite;
    healthRemaining: number = 100;

    constructor(position: Position) {
        super(position, { walkable: false, destroyable: true });
        this.sprite = PIXI.Sprite.from('assets/hay.png');
        this.sprite.x = position.x * Constants.BLOCK_SIZE;
        this.sprite.y = position.y * Constants.BLOCK_SIZE;
    }

    takeDamage(damage: number) {
        this.healthRemaining -= damage;
        if (this.healthRemaining <= 0) {
            this.destroyHay();
        }
    }

    private destroyHay() {
        const hayToRemove = this.findHayToRemove();
        if (hayToRemove != -1) {
            Constants.hays.splice(hayToRemove, 1);
            Constants.app.stage.removeChild(this.sprite);
            Constants.grid.freePosition(this.position);
        }
    }

    private findHayToRemove(): number {
        return Constants.hays.findIndex((hay) => hay.position.x === this.position.x && hay.position.y === this.position.y);
    }
}
