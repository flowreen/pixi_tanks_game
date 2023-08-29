import * as PIXI from 'pixi.js';
import { GameConstants, Position } from "../Data/GameConstants";
import { GridObject } from "./GridObject";
import { Direction } from "../Data/GameEnums";

/**
 * The Bullet class represents a bullet in the game.
 * It contains methods for moving the bullet and checking for collisions.
 */
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
        this.sprite.x = position.x * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5;
        this.sprite.y = position.y * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5;
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
        if (GameConstants.grid.checkBulletCollision(this.position, this.damage)) {
            let bulletToRemove = GameConstants.bullets.findIndex(bullet => GameConstants.createPosition(bullet.position.x, bullet.position.y).equals(this.position));
            if (bulletToRemove!== -1) {
                GameConstants.bullets.splice(bulletToRemove, 1);
                GameConstants.app.stage.removeChild(this.sprite);
            }
        }
    }
}
