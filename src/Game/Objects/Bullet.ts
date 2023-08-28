import * as PIXI from 'pixi.js';
import { Constants, Direction, Position } from "../Data/Constants";
import { GridObject } from "./GridObject";

export class Bullet extends GridObject {
    sprite: PIXI.Sprite;
    damage: number;
    direction: Direction;

    constructor(position: Position, direction: Direction, damage: number) {
        super(position, { walkable: true, destroyable: true });
        this.sprite = PIXI.Sprite.from('assets/bullet.png');
        this.direction = direction;
        this.sprite.anchor.set(0.5);
        this.setPosition(position);
        this.damage = damage;
    }

    setPosition(position: Position): void {
        this.sprite.x = position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
        this.sprite.y = position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
    }

    move(): void {
        switch (this.direction) {
            case Direction.UP:
                this.position.y -= 0.1;
                break;
            case Direction.RIGHT:
                this.position.x += 0.1;
                break;
            case Direction.DOWN:
                this.position.y += 0.1;
                break;
            case Direction.LEFT:
                this.position.x -= 0.1;
                break;
        }
        this.setPosition(this.position);
        if (Constants.grid.checkBulletCollision(this.position, this.damage)) {
            let bulletToRemove = Constants.bullets.findIndex(bullet => Constants.createPosition(bullet.position.x, bullet.position.y).equals(this.position));
            if (bulletToRemove!== -1) {
                Constants.bullets.splice(bulletToRemove, 1);
                Constants.app.stage.removeChild(this.sprite);
            }
        }
    }
}
