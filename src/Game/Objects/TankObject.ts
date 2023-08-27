import * as PIXI from 'pixi.js';
import {BulletObject} from "./BulletObject";
import {Constants, Direction, Position} from "../Data/Constants";

export class TankObject {
    sprite: PIXI.Sprite;
    bullets: BulletObject[] = [];
    position: Position;
    direction: Direction;
    remainingBullets: number = 0;
    maxBullets: number;
    bulletDamage: number;

    constructor(texture: string, position: Position, maxBullets: number, bulletsDamage: number) {
        this.sprite = PIXI.Sprite.from(texture);
        this.position = position;
        this.direction = Direction.UP;
        // Set the initial positions
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        // add centered anchor sprite offset
        this.sprite.position.set(this.position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5, this.position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5);
        this.maxBullets = maxBullets;
        this.bulletDamage = bulletsDamage;
        this.reload();
    }

    fire(): void {
        if (this.remainingBullets == 0) {
            return;
        }
        this.remainingBullets--;

        const bullet = new BulletObject(this.position, this.direction, this.bulletDamage);
        this.bullets.push(bullet);
        Constants.app.stage.addChild(bullet.sprite);
    }

    reload() {
        this.remainingBullets = this.maxBullets;
    }
}
