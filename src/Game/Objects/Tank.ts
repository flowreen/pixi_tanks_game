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
    playerControlled: boolean = false;

    constructor(texture: string, position: Position, maxBullets: number, bulletsDamage: number) {
        super(position, {walkable: true, destroyable: false})
        this.sprite = PIXI.Sprite.from(texture);
        // Set the initial positions
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        // add centered anchor sprite offset
        this.sprite.position.set(this.position.x * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5, this.position.y * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5);
        this.direction = Direction.UP;
        this.maxBullets = maxBullets;
        this.remainingBullets = this.maxBullets;
        this.bulletDamage = bulletsDamage;

        // Create an object mapping event names to methods
        const eventToMethodMap: { [eventName: string]: () => void } = {
            'fireTank': () => this.fire(),
            'reloadBullets': () => this.reloadBullets(),
            'moveUp': () => this.move(Direction.UP),
            'moveDown': () => this.move(Direction.DOWN),
            'moveLeft': () => this.move(Direction.LEFT),
            'moveRight': () => this.move(Direction.RIGHT),
        };

        // Loop through the mapping object to set up the event listeners
        for (const [eventName, method] of Object.entries(eventToMethodMap)) {
            GameConstants.eventEmitter.on(eventName, method);
        }
    }

    private fire(): void {
        if (!this.playerControlled) {
            return;
        }
        if (this.remainingBullets == 0) {
            return;
        }
        this.remainingBullets--;

        const bulletPosition: Position = {
            x: this.position.x, y: this.position.y
        };
        const bullet = new Bullet(bulletPosition, this.direction, this.bulletDamage);
        GameConstants.bullets.push(bullet);
        GameConstants.app.stage.addChild(bullet.sprite);
    }

    private reloadBullets() {
        if (!this.playerControlled) {
            return;
        }
        this.remainingBullets = this.maxBullets;
    }

    private move(newDirection: Direction): void {
        if (!this.playerControlled) {
            return;
        }
        if (newDirection !== this.direction) {
            this.setNewDirection(newDirection);
            return;
        }

        const newPosition = {...this.position};
        switch (newDirection) {
            case Direction.UP:
                newPosition.y -= 1;
                break;
            case Direction.RIGHT:
                newPosition.x += 1;
                break;
            case Direction.DOWN:
                newPosition.y += 1;
                break;
            case Direction.LEFT:
                newPosition.x -= 1;
                break;
        }

        if (GameConstants.grid.isDestinationWalkable(newPosition)) {
            this.position = newPosition;
            this.sprite.position.set(newPosition.x * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5, newPosition.y * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5);
        }
    }

    private setNewDirection(newDirection: Direction) {
        this.direction = newDirection;
        this.sprite.angle = 90 * newDirection;
    }
}
