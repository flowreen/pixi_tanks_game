import * as PIXI from 'pixi.js';
import {Constants, Direction, Position} from "../Data/Constants";

export class BulletObject {
    sprite: PIXI.Sprite;
    position: Position;
    direction: Direction;
    damage: number;

    constructor(position: Position, direction: Direction, damage: number) {
        this.sprite = PIXI.Sprite.from('assets/bullet.png');
        this.direction = direction;
        this.position = position;
        // Set the initial positions
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        // add centered anchor sprite offset
        this.sprite.x = position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
        this.sprite.y = position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
        this.sprite.width = Constants.BULLET_SIZE;
        this.sprite.height = Constants.BULLET_SIZE;
        this.damage = damage;
    }

    move(): void {
        // Update the bullet's position based on its direction and speed
        switch (this.direction) {
            case Direction.UP:
                this.position.y -= 0.1;
                this.sprite.y = this.position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
                break;
            case Direction.RIGHT:
                this.position.x += 0.1;
                this.sprite.x = this.position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
                break;
            case Direction.DOWN:
                this.position.y += 0.1;
                this.sprite.y = this.position.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
                break;
            case Direction.LEFT:
                this.position.x -= 0.1;
                this.sprite.x = this.position.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5;
                break;
        }
        if (this.isCollision({
            x: Math.round(this.position.x), y: Math.round(this.position.y),
        })) {
            // Destroy bullet
            let bulletToRemove = -1;
            // Find current colliding bullet
            for (let i = 0; i < Constants.bulletObjects.length; i++) {
                let bullet = Constants.bulletObjects[i];
                if (bullet.position.x == this.position.x && bullet.position.y == this.position.y) {
                    bulletToRemove = i;
                }
            }
            if (bulletToRemove != -1) {
                // Remove bullet from game scene
                Constants.bulletObjects.splice(bulletToRemove, 1);
                Constants.app.stage.removeChild(this.sprite);
            }
        }
    }

    isCollision(position: Position): boolean {
        // Check against edges of grid
        if (position.x < 0 || position.x >= Constants.GRID_SIZE || position.y < 0 || position.y >= Constants.GRID_SIZE) {
            return true;
        }
        // Check against all walls and hays
        for (let wall of Constants.wallObjects) { // Assuming walls is an array of wall positions
            if (wall.position.x === position.x && wall.position.y === position.y) {
                return true;
            }
        }
        for (let hay of Constants.hayObjects) { // Assuming hays is an array of hay positions
            if (hay.position.x === position.x && hay.position.y === position.y) {
                hay.takeDamage(this.damage)
                return true;
            }
        }
        return false;
    }
}
