import { GameConstants } from "../Data/GameConstants";

/**
 * The GameController class handles the main game logic.
 */
export class GameController {
    private mainTankId = 0;

    constructor() {
        this.assignControlToRandomTank();
    }

    public handleKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'KeyR':
                GameConstants.eventEmitter.emit('reloadBullets');
                break;
            case 'KeyT':
                this.transferControlToNextTank();
                break;
            case 'Space':
                GameConstants.eventEmitter.emit('fireTank');
                break;
            case 'KeyW':
            case 'ArrowUp':
                GameConstants.eventEmitter.emit('moveUp');
                break;
            case 'KeyS':
            case 'ArrowDown':
                GameConstants.eventEmitter.emit('moveDown');
                break;
            case 'KeyA':
            case 'ArrowLeft':
                GameConstants.eventEmitter.emit('moveLeft');
                break;
            case 'KeyD':
            case 'ArrowRight':
                GameConstants.eventEmitter.emit('moveRight');
                break;
            //... other key events for firing, etc.
        }
    }

    private assignControlToRandomTank() {
        const randomIndex = Math.floor(Math.random() * GameConstants.tanks.length);
        this.assignControl(randomIndex);
        GameConstants.tanks[this.mainTankId].sprite.visible = true;
    }

    private transferControlToNextTank() {
        this.assignControl((this.mainTankId + 1) % GameConstants.tanks.length);
    }

    private assignControl(newControlledTankId: number) {
        const oldTank = GameConstants.tanks[this.mainTankId];
        this.mainTankId = newControlledTankId;
        for (let i = 0; i < GameConstants.tanks.length; i++) {
            const tank = GameConstants.tanks[i];
            const isChosenTank = i === this.mainTankId;
            tank.playerControlled = isChosenTank;
            tank.sprite.visible = isChosenTank;
            if (isChosenTank) {
                tank.position = oldTank.position;
                tank.direction = oldTank.direction;
                tank.sprite.x = oldTank.sprite.x;
                tank.sprite.y = oldTank.sprite.y;
                tank.sprite.angle = oldTank.sprite.angle
            }
        }
    }
}
