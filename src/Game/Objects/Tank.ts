import * as PIXI from 'pixi.js';
import { Bullet } from "./Bullet";
import { GameConstants, Position } from "../Data/GameConstants";
import { GridObject } from "./GridObject";
import { Direction } from "../Data/GameEnums";

/**
 * The Tank class represents a tank in the game.
 * It contains methods for moving the tank, rotating its turret, and firing bullets.
 */
export class Tank extends GridObject {
    sprite: PIXI.Sprite;
    direction: Direction;
    remainingBullets: number = 0;
    maxBullets: number;
    bulletDamage: number;

    constructor(texture: string, position: Position, maxBullets: number, bulletsDamage: number) {
        super(position, {walkable: true, destroyable: false})
        this.sprite = PIXI.Sprite.from(texture);
        this.direction = Direction.UP;
        // Set the initial positions
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        // add centered anchor sprite offset
        this.sprite.position.set(this.position.x * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5, this.position.y * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5);
        this.maxBullets = maxBullets;
        this.bulletDamage = bulletsDamage;
        this.reloadBullets();
    }

    fire(): void {
        if (this.remainingBullets == 0) {
            return;
        }
        this.remainingBullets--;

        let bulletPosition: Position = {
            x: this.position.x, y: this.position.y
        };
        const bullet = new Bullet(bulletPosition, this.direction, this.bulletDamage);
        GameConstants.bullets.push(bullet);
        GameConstants.app.stage.addChild(bullet.sprite);
    }

    reloadBullets() {
        this.remainingBullets = this.maxBullets;
    }
}
