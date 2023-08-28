import * as PIXI from 'pixi.js';
import { Constants, Position } from "../Data/Constants";
import { Tank } from "../Objects/Tank";
import { Hay } from "../Objects/Hay";
import { Wall } from "../Objects/Wall";
import { GameController } from "../Controller/GameController";
import { Grid } from "../Objects/Grid";

export class Scene {
    private occupiedPositions: Position[] = [];

    constructor() {
        // Add the app view (canvas) to the document body
        document.body.appendChild(Constants.app.view as HTMLCanvasElement);

        this.setup();
    }

    // Function to draw the grid
    private drawGrid(): void {
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

    private getRandomPosition(): Position {
        let position: Position;
        do {
            position = {
                x: Math.floor(Math.random() * Constants.GRID_SIZE),
                y: Math.floor(Math.random() * Constants.GRID_SIZE)
            };
        } while (this.occupiedPositions.some(p => p.x === position.x && p.y === position.y));
        this.occupiedPositions.push(position);
        return position;
    }

    private drawHay(position: Position): void {
        const hayObject = new Hay(position);
        Constants.hays.push(hayObject);
        Constants.app.stage.addChild(hayObject.sprite);
    }

    private drawWall(position: Position): void {
        const wallObject = new Wall(position);
        Constants.walls.push(wallObject);
        Constants.app.stage.addChild(wallObject.sprite);
    }

    private drawTank(position: Position): void {
        const redTank = new Tank('assets/red_tank.png', position, 2, 10);
        const blueTank = new Tank('assets/blue_tank.png', position, 3, 20);
        const greenTank = new Tank('assets/green_tank.png', position, 1, 25);

        Constants.tanks.push(redTank, blueTank, greenTank);

        const controller = new GameController();
        controller.initializeEventListeners();
        controller.assignControlToRandomTank();

        // Add the tank sprites to the stage
        Constants.app.stage.addChild(redTank.sprite, blueTank.sprite, greenTank.sprite);

        Constants.app.ticker.add(() => {
            // For each tank, update the position of its bullets
            Constants.bullets.forEach(bullet => bullet.move());
        });
    }

    private setup(): void {
        // Draw the grid
        this.drawGrid();

        Constants.grid = new Grid({ width: Constants.GRID_SIZE, height: Constants.GRID_SIZE });

        // Generate and draw 25 hays
        for (let i = 0; i < 25; i++) {
            this.drawHay(this.getRandomPosition());
        }

        // Generate and draw 50 walls
        for (let i = 0; i < 50; i++) {
            this.drawWall(this.getRandomPosition());
        }

        // Draw the tank
        this.drawTank(this.getRandomPosition());

        // Update the grid with the hay and wall positions
        for (let i = 0; i < Constants.hays.length; i++) {
            Constants.grid.getGridObjectByPosition(Constants.hays[i].position).properties = Constants.hays[i].properties;
        }
        for (let i = 0; i < Constants.walls.length; i++) {
            Constants.grid.getGridObjectByPosition(Constants.walls[i].position).properties = Constants.walls[i].properties;
        }
    }
}
