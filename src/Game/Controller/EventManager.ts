import { GameController } from './GameController';

/**
 * The EventManager class is responsible for handling all game-related events.
 * This includes keyboard events for controlling game objects.
 */
export class EventManager {
    constructor(private gameController: GameController) {
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        this.gameController.handleKeyDown(event);
    }
}
