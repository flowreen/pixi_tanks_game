import * as PIXI from 'pixi.js';
import { GameConstants, Position } from "../Data/GameConstants";
import { Tank } from "../Objects/Tank";
import { Hay } from "../Objects/Hay";
import { Wall } from "../Objects/Wall";
import { GameController } from "../Controller/GameController";
import { Grid } from "../Objects/Grid";
import { EventManager } from "../Controller/EventManager";

/**
 * The Scene class manages the game scenes.
 */
export class Scene {
    private occupiedPositions: Position[] = [];

    constructor() {
        // Add the app view (canvas) to the document body
        document.body.appendChild(GameConstants.app.view as HTMLCanvasElement);

        this.setup();
    }

    // Function to draw the grid
    private drawGrid(): void {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x000000, 0.5); // Line style: 1px wide, black color, 50% opacity

        // Draw vertical lines
        for (let i = 0; i <= GameConstants.GRID_SIZE; i++) {
            graphics.moveTo(i * GameConstants.BLOCK_SIZE, 0);
            graphics.lineTo(i * GameConstants.BLOCK_SIZE + 1, GameConstants.BLOCK_SIZE * GameConstants.GRID_SIZE);
        }

        // Draw horizontal lines
        for (let j = 0; j <= GameConstants.GRID_SIZE; j++) {
            graphics.moveTo(0, j * GameConstants.BLOCK_SIZE);
            graphics.lineTo(GameConstants.BLOCK_SIZE * GameConstants.GRID_SIZE + 1, j * GameConstants.BLOCK_SIZE);
        }

        GameConstants.app.stage.addChild(graphics);
    }

    private getRandomPosition(): Position {
        let position: Position;
        do {
            position = {
                x: Math.floor(Math.random() * GameConstants.GRID_SIZE),
                y: Math.floor(Math.random() * GameConstants.GRID_SIZE)
            };
        } while (this.occupiedPositions.some(p => p.x === position.x && p.y === position.y));
        this.occupiedPositions.push(position);
        return position;
    }

    private drawHay(position: Position): void {
        const hayObject = new Hay(position);
        GameConstants.hays.push(hayObject);
        GameConstants.app.stage.addChild(hayObject.sprite);
    }

    private drawWall(position: Position): void {
        const wallObject = new Wall(position);
        GameConstants.walls.push(wallObject);
        GameConstants.app.stage.addChild(wallObject.sprite);
    }

    private drawTank(position: Position): void {
        const redTank = new Tank('assets/red_tank.png', position, 2, 10);
        const blueTank = new Tank('assets/blue_tank.png', position, 3, 20);
        const greenTank = new Tank('assets/green_tank.png', position, 1, 25);

        GameConstants.tanks.push(redTank, blueTank, greenTank);

        // Add the tank sprites to the stage
        GameConstants.app.stage.addChild(redTank.sprite, blueTank.sprite, greenTank.sprite);

        GameConstants.app.ticker.add(() => {
            // For each tank, update the position of its bullets
            GameConstants.bullets.forEach(bullet => bullet.move());
        });
    }

    private setup(): void {
        // Draw the grid
        this.drawGrid();

        GameConstants.grid = new Grid({ width: GameConstants.GRID_SIZE, height: GameConstants.GRID_SIZE });

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
        for (let i = 0; i < GameConstants.hays.length; i++) {
            GameConstants.grid.getGridObjectByPosition(GameConstants.hays[i].position).properties = GameConstants.hays[i].properties;
        }
        for (let i = 0; i < GameConstants.walls.length; i++) {
            GameConstants.grid.getGridObjectByPosition(GameConstants.walls[i].position).properties = GameConstants.walls[i].properties;
        }

        const gameController = new GameController();
        const eventManager = new EventManager(gameController);
    }
}
