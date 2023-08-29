import * as PIXI from 'pixi.js';
import { Bullet } from "../Objects/Bullet";
import { Hay } from "../Objects/Hay";
import { Wall } from "../Objects/Wall";
import { Tank } from "../Objects/Tank";
import { Grid } from "../Objects/Grid";

type Position = {
    x: number;
    y: number;
};

interface PositionWithEquals extends Position {
    equals(other: Position): boolean;
}

type Properties = {
    walkable: boolean;
    destroyable: boolean;
};

type Size = {
    width: number;
    height: number;
};

/**
 * The EventManager class is responsible for handling all game-related events.
 * This includes keyboard events for controlling game objects.
 */
class GameConstants {
    public static BLOCK_SIZE = 35;
    public static GRID_SIZE = 50;
    public static bullets: Bullet[] = [];
    public static hays: Hay[] = [];
    public static walls: Wall[] = [];
    public static tanks: Tank[] = [];
    public static grid: Grid;
    public static app: PIXI.Application<PIXI.ICanvas>;

    public static createPosition(x: number, y: number): PositionWithEquals {
        return {
            x,
            y,
            equals(other: Position): boolean {
                return this.x === other.x && this.y === other.y;
            },
        };
    }
}

export { GameConstants, Position, Properties, Size };
