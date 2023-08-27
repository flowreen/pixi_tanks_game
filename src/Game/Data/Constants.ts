import * as PIXI from 'pixi.js';
import {HayObject} from "../Objects/HayObject";
import {WallObject} from "../Objects/WallObject";
import {TankObject} from "../Objects/TankObject";
import {BulletObject} from "../Objects/BulletObject";

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
    public static bulletObjects: BulletObject[] = [];
    public static hayObjects: HayObject[] = [];
    public static wallObjects: WallObject[] = [];
    public static tankObjects: TankObject[] = [];

    // Pixi Application
    public static app: PIXI.Application<PIXI.ICanvas>;
}
