import { GridObject } from "./GridObject";
import { GameConstants, Position, Size } from "../Data/GameConstants";

/**
 * The Grid class is responsible for managing the game grid.
 * It handles grid creation, updates, and collision detection.
 */
export class Grid {
    private gridObjects: GridObject[][] = [];

    constructor(size: Size) {
        for (let x = 0; x < size.width; x++) {
            this.gridObjects[x] = [];
            for (let y = 0; y < size.height; y++) {
                this.gridObjects[x][y] = new GridObject({x, y}, {walkable: true, destroyable: false});
            }
        }
    }

    getGridObjectByPosition(position: Position) {
        return this.gridObjects[position.x][position.y];
    }

    freePosition(position: Position) {
        this.getGridObjectByPosition(position).properties.destroyable = false;
        this.getGridObjectByPosition(position).properties.walkable = true;
    }

    checkBulletCollision(bulletPosition: Position, damage: number) {
        const newPosition = {x: Math.round(bulletPosition.x), y: Math.round(bulletPosition.y)};
        if (this.isOutOfBounds(newPosition)) {
            return true;
        }
        if (this.isCollision(newPosition)) {
            const collider = this.getGridObjectByPosition(newPosition);
            if (collider.properties.destroyable) {
                GameConstants.hays.forEach((hay) => {
                    if (hay.position.x === newPosition.x && hay.position.y === newPosition.y) {
                        hay.takeDamage(damage);
                    }
                });
            }
            return true;
        }
        return false;
    }

    isDestinationWalkable(newPosition: Position) {
        return !this.isOutOfBounds(newPosition) && !this.isCollision(newPosition);
    }

    private isCollision(position: Position): boolean {
        const gridObject = this.getGridObjectByPosition(position);
        return !gridObject.properties.walkable;
    }

    private isOutOfBounds(position: Position) {
        return position.x < 0 || position.x >= GameConstants.GRID_SIZE || position.y < 0 || position.y >= GameConstants.GRID_SIZE;
    }
}
