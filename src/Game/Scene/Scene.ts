import * as PIXI from 'pixi.js';
import {Constants, Position} from "../Data/Constants";
import {TankObject} from "../Objects/TankObject";
import {HayObject} from "../Objects/HayObject";
import {WallObject} from "../Objects/WallObject";
import {GameController} from "../Controller/GameController";

export class Scene {
    occupiedPositions: Position[] = [];

    constructor() {
        // Add the app view (canvas) to the document body
        document.body.appendChild(Constants.app.view as HTMLCanvasElement);

        this.setup();
    }

    // Function to draw the grid
    protected drawGrid(): void {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x000000, 0.5); // Line style: 1px wide, black color, 50% opacity

        // Draw vertical lines
        for (let i = 0; i <= Constants.GRID_SIZE; i++) {
            graphics.moveTo(i * Constants.BLOCK_SIZE, 0);
            graphics.lineTo(i * Constants.BLOCK_SIZE + 1, Constants.BLOCK_SIZE * Constants.GRID_SIZE);
        }

        // Draw horizontal lines
        for (let j = 0; j <= Constants.GRID_SIZE; j++) {
            graphics.moveTo(0, j * Constants.BLOCK_SIZE);
            graphics.lineTo(Constants.BLOCK_SIZE * Constants.GRID_SIZE + 1, j * Constants.BLOCK_SIZE);
        }

        Constants.app.stage.addChild(graphics);
    }

    protected getRandomPosition(): Position {
        let position: Position;
        do {
            position = {
                x: Math.floor(Math.random() * Constants.GRID_SIZE), y: Math.floor(Math.random() * Constants.GRID_SIZE)
            };
        } while (this.occupiedPositions.some(p => p.x === position.x && p.y === position.y));
        this.occupiedPositions.push(position);
        return position;
    }

    protected drawHay(position: Position): void {
        const hayObject = new HayObject(position);
        Constants.hayObjects.push(hayObject);
        Constants.app.stage.addChild(hayObject.sprite);
    }

    protected drawWall(position: Position): void {
        const wallObject = new WallObject(position);
        Constants.wallObjects.push(wallObject);
        Constants.app.stage.addChild(wallObject.sprite);
    }

    protected drawTank(position: Position): void {
        const redTank = new TankObject('assets/red_tank.png', position, 2, 10);
        const blueTank = new TankObject('assets/blue_tank.png', position, 3, 20);
        const greenTank = new TankObject('assets/green_tank.png', position, 1, 25);

        Constants.tankObjects.push(redTank, blueTank, greenTank);

        let controller = new GameController();
        controller.initializeEventListeners();
        controller.assignControlToRandomTank();

        // Add the tank sprites to the stage
        Constants.app.stage.addChild(redTank.sprite, blueTank.sprite, greenTank.sprite);

        Constants.app.ticker.add(() => {
            // For each tank, update the position of its bullets
            redTank.bullets.forEach(bullet => bullet.move());
            blueTank.bullets.forEach(bullet => bullet.move());
            greenTank.bullets.forEach(bullet => bullet.move());
        });
    }

    protected setup(): void {
        // Draw the grid
        this.drawGrid();

        // Generate and draw 25 hays
        for (let i = 0; i < 25; i++) {
            this.drawHay(this.getRandomPosition());
        }

        // Generate and draw 50 walls
        for (let i = 0; i < 50; i++) {
            this.drawWall(this.getRandomPosition());
        }

        this.drawTank(this.getRandomPosition());
    }
}
