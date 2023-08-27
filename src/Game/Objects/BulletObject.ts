import * as PIXI from 'pixi.js';
import {Constants, Direction, Position} from "../Data/Constants";

export class BulletObject {
    sprite: PIXI.Sprite;
    position: Position;
    direction: Direction;

    constructor(position: Position, direction: Direction) {
        this.sprite = PIXI.Sprite.from('assets/bullet.png',);
        this.direction = direction;
        this.position = position;
        this.sprite.x = position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
        this.sprite.y = position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
        this.sprite.width = Constants.BULLET_SIZE;
        this.sprite.height = Constants.BULLET_SIZE;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
    }

    move(): void {
        // Update the bullet's position based on its direction and speed
        switch (this.direction) {
            case Direction.UP:
                this.sprite.y -= Constants.BULLET_SIZE;
                break;
            case Direction.RIGHT:
                this.sprite.x += Constants.BULLET_SIZE;
                break;
            case Direction.DOWN:
                this.sprite.y += Constants.BULLET_SIZE;
                break;
            case Direction.LEFT:
                this.sprite.x -= Constants.BULLET_SIZE;
                break;
        }
    }
}
