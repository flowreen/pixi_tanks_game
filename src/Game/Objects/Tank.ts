import * as PIXI from 'pixi.js';
import { Bullet } from "./Bullet";
import { Constants, Direction, Position } from "../Data/Constants";
import { GridObject } from "./GridObject";

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
        this.sprite.position.set(this.position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5, this.position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5);
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
        Constants.bullets.push(bullet);
        Constants.app.stage.addChild(bullet.sprite);
    }

    reloadBullets() {
        this.remainingBullets = this.maxBullets;
    }
}
