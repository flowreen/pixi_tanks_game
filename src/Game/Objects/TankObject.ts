import * as PIXI from 'pixi.js';
import {BulletObject} from "./BulletObject";
import {Constants, Direction, Position} from "../Data/Constants";

export class TankObject {
    sprite: PIXI.Sprite;
    bullets: BulletObject[] = [];
    position: Position;
    direction: Direction;

    constructor(texture: string, position: Position) {
        this.sprite = PIXI.Sprite.from(texture);
        this.position = position;
        this.direction = Direction.UP;
        // Set the initial positions
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.set(this.position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5, this.position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5);
    }

    fire(): void {
        let bulletStartPosition: Position = {...this.position};

        switch (this.direction) {
            case Direction.UP:
                bulletStartPosition.y -= 1;
                break;
            case Direction.DOWN:
                bulletStartPosition.y += 1;
                break;
            case Direction.LEFT:
                bulletStartPosition.x -= 1;
                break;
            case Direction.RIGHT:
                bulletStartPosition.x += 1;
                break;
        }

        const bullet = new BulletObject(bulletStartPosition, this.direction);
        this.bullets.push(bullet);
        Constants.app.stage.addChild(bullet.sprite);
    }
}
