import {Constants, Direction, Position} from "../Data/Constants";

export class GameController {
    mainTankId = 0;

    initializeEventListeners() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyR':
                    this.reloadTank();
                    break;
                case 'KeyT':
                    this.assignControlToNextTank();
                    break;
                case 'Space':
                    Constants.tankObjects[this.mainTankId].fire();
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
                // ... other key events for firing, etc.
            }
        });
    }

    assignControlToRandomTank() {
        let random = Math.floor(Math.random() * 3);
        this.assignControl(random);
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
                return true;
            }
        }
        return false;
    }

    private moveTank(newDirection: Direction) {
        if (newDirection != Constants.tankObjects[this.mainTankId].direction) {
            this.setNewDirection(newDirection);
            return;
        }

        let newPosition: Position = {...Constants.tankObjects[this.mainTankId].position};
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

        if (!this.isCollision(newPosition)) {
            for (let i = 0; i < Constants.tankObjects.length; i++) {
                let tank = Constants.tankObjects[i];
                tank.position = newPosition;
                // add centered anchor sprite offset
                tank.sprite.position.set(newPosition.x * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5, newPosition.y * Constants.BLOCK_SIZE + Constants.BLOCK_SIZE * 0.5);
            }
        }
    }

    private setNewDirection(newDirection: Direction) {
        for (let i = 0; i < Constants.tankObjects.length; i++) {
            let tank = Constants.tankObjects[i];
            tank.direction = newDirection;
            tank.sprite.angle = 90 * newDirection;
        }
    }

    private assignControlToNextTank() {
        this.assignControl((this.mainTankId + 1) % Constants.tankObjects.length);
    }

    private assignControl(newControlledTankId: number) {
        this.mainTankId = newControlledTankId;
        for (let i = 0; i < Constants.tankObjects.length; i++) {
            let tank = Constants.tankObjects[i];
            tank.sprite.visible = i == newControlledTankId;
        }
    }

    private reloadTank() {
        for (let i = 0; i < Constants.tankObjects.length; i++) {
            let tank = Constants.tankObjects[i];
            tank.reload();
        }
    }
}
