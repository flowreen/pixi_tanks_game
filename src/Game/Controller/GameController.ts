import {TankObject} from "../Objects/TankObject";
import {Direction} from "../Data/Constants";

export class GameController {
    mainTankId = 0;
    tankObjects: TankObject[] = [];

    constructor(tankObjects: TankObject[]) {
        this.tankObjects = tankObjects;
    }

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
                    this.tankObjects[this.mainTankId].fire();
                    break;
                case 'KeyW':
                case 'ArrowUp':
                    this.setNewDirection(Direction.UP);
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.setNewDirection(Direction.DOWN);
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.setNewDirection(Direction.LEFT);
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.setNewDirection(Direction.RIGHT);
                    break;
                // ... other key events for firing, etc.
            }
        });
    }

    assignControlToRandomTank() {
        let random = Math.floor(Math.random() * 3);
        this.assignControl(random);
    }

    private setNewDirection(newDirection: Direction) {
        for (let i = 0; i < this.tankObjects.length; i++) {
            let tank = this.tankObjects[i];
            tank.direction = newDirection;
            tank.sprite.angle = 90 * newDirection;
        }
    }

    private assignControlToNextTank() {
        this.assignControl((this.mainTankId + 1) % this.tankObjects.length);
    }

    private assignControl(newControlledTankId: number) {
        this.mainTankId = newControlledTankId;
        for (let i = 0; i < this.tankObjects.length; i++) {
            let tank = this.tankObjects[i];
            tank.sprite.visible = i == newControlledTankId;
        }
    }

    private reloadTank() {
        for (let i = 0; i < this.tankObjects.length; i++) {
            let tank = this.tankObjects[i];
            tank.reload();
        }
    }
}
