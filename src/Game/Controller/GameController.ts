import { GameConstants } from "../Data/GameConstants";
import { Direction } from "../Data/GameEnums";

/**
 * The GameController class handles the main game logic.
 */
export class GameController {
    mainTankId = 0;

    handleKeyDown = (event: KeyboardEvent) => {
        switch (event.code) {
            case 'KeyR':
                this.reloadTankBullets();
                break;
            case 'KeyT':
                this.transferControlToNextTank();
                break;
            case 'Space':
                this.fireMainTank();
                break;
            case 'KeyW':
            case 'ArrowUp':
                this.moveTank(Direction.UP);
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.moveTank(Direction.DOWN);
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.moveTank(Direction.LEFT);
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.moveTank(Direction.RIGHT);
                break;
            //... other key events for firing, etc.
        }
    };

    assignControlToRandomTank() {
        const randomIndex = Math.floor(Math.random() * GameConstants.tanks.length);
        this.assignControl(randomIndex);
    }

    private moveTank(newDirection: Direction) {
        const mainTank = GameConstants.tanks[this.mainTankId];
        if (newDirection!== mainTank.direction) {
            this.setNewDirection(newDirection);
            return;
        }

        const newPosition = {...mainTank.position };
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
            for (const tank of GameConstants.tanks) {
                tank.position = newPosition;
                tank.sprite.position.set(
                    newPosition.x * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5,
                    newPosition.y * GameConstants.BLOCK_SIZE + GameConstants.BLOCK_SIZE * 0.5
                );
            }
        }
    }

    private setNewDirection(newDirection: Direction) {
        for (const tank of GameConstants.tanks) {
            tank.direction = newDirection;
            tank.sprite.angle = 90 * newDirection;
        }
    }

    private transferControlToNextTank() {
        this.assignControl((this.mainTankId + 1) % GameConstants.tanks.length);
    }

    private assignControl(newControlledTankId: number) {
        this.mainTankId = newControlledTankId;
        for (let i = 0; i < GameConstants.tanks.length; i++) {
            let tank = GameConstants.tanks[i];
            tank.sprite.visible = i === newControlledTankId;
        }
    }

    private fireMainTank() {
        const mainTank = GameConstants.tanks[this.mainTankId];
        mainTank.fire();
    }

    private reloadTankBullets() {
        for (const tank of GameConstants.tanks) {
            tank.reloadBullets();
        }
    }
}
