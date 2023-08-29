import * as PIXI from 'pixi.js';
import { GameConstants } from "../Data/GameConstants";
import { Scene } from "./Scene";

/**
 * The App class initializes the PixiJS application and sets up the game.
 * It is the entry point for the game logic.
 */
export class App {
    constructor() {
        this.initializePixiApp();
        this.initializeScene();
    }

    private initializePixiApp() {
        const app = new PIXI.Application({
            width: GameConstants.BLOCK_SIZE * GameConstants.GRID_SIZE + 1,
            height: GameConstants.BLOCK_SIZE * GameConstants.GRID_SIZE + 1,
            backgroundColor: 0xffffff
        });

        // add pixi inspector Chrome extension initialization code
        // @ts-ignore
        globalThis.__PIXI_APP__ = app;

        GameConstants.app = app;
    }

    private initializeScene() {
        const scene = new Scene();
    }
}
