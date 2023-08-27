import * as PIXI from 'pixi.js';

export enum Direction {
    UP, RIGHT, DOWN, LEFT
}

export type Position = {
    x: number; y: number;
};

export class Constants {
    // Constants for the game grid
    public static BLOCK_SIZE = 35;
    public static GRID_SIZE = 50;
    public static BULLET_SIZE = 5;

    // Pixi Application
    public static app: PIXI.Application<PIXI.ICanvas>;
}