import * as PIXI from 'pixi.js';

// Constants for the game grid
const BLOCK_SIZE = 35;
const GRID_SIZE = 50;

// Create a new Pixi Application
const app = new PIXI.Application({
    width: BLOCK_SIZE * GRID_SIZE, height: BLOCK_SIZE * GRID_SIZE, backgroundColor: 0xffffff
});

// Add the app view (canvas) to the document body
document.body.appendChild(app.view as HTMLCanvasElement);

// add pixi inspector chrome extension initialization code
// @ts-ignore
globalThis.__PIXI_APP__ = app;

// Function to draw the grid
function drawGrid(): void {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(1, 0x000000, 0.5); // Line style: 1px wide, black color, 50% opacity

    // Draw vertical lines
    for (let i = 0; i <= GRID_SIZE; i++) {
        graphics.moveTo(i * BLOCK_SIZE, 0);
        graphics.lineTo(i * BLOCK_SIZE, BLOCK_SIZE * GRID_SIZE);
    }

    // Draw horizontal lines
    for (let j = 0; j <= GRID_SIZE; j++) {
        graphics.moveTo(0, j * BLOCK_SIZE);
        graphics.lineTo(BLOCK_SIZE * GRID_SIZE, j * BLOCK_SIZE);
    }

    app.stage.addChild(graphics);
}

type Position = {
    x: number; y: number;
};

const occupiedPositions: Position[] = [];

function getRandomPosition(): Position {
    let position: Position;
    do {
        position = {
            x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (occupiedPositions.some(p => p.x === position.x && p.y === position.y));
    occupiedPositions.push(position);
    return position;
}

function drawHay(position: Position): void {
    const haySprite = PIXI.Sprite.from('assets/hay.png')
    haySprite.x = position.x * BLOCK_SIZE;
    haySprite.y = position.y * BLOCK_SIZE;
    haySprite.width = BLOCK_SIZE;
    haySprite.height = BLOCK_SIZE;
    app.stage.addChild(haySprite);
}

function drawWall(position: Position): void {
    const wallSprite = PIXI.Sprite.from('assets/wall.png')
    wallSprite.x = position.x * BLOCK_SIZE;
    wallSprite.y = position.y * BLOCK_SIZE;
    wallSprite.width = BLOCK_SIZE;
    wallSprite.height = BLOCK_SIZE;
    app.stage.addChild(wallSprite);
}

function setup(): void {
    // Draw the grid
    drawGrid();

    // Generate and draw 25 hays
    for (let i = 0; i < 25; i++) {
        drawHay(getRandomPosition());
    }

    // Generate and draw 50 walls
    for (let i = 0; i < 50; i++) {
        drawWall(getRandomPosition());
    }
}

setup();
