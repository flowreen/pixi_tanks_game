import * as PIXI from 'pixi.js';
import {Constants} from "../Data/Constants";
import {Scene} from "./Scene";

export class App {
    constructor() {
        // Create a new Pixi Application
        const app = new PIXI.Application({
            width: Constants.BLOCK_SIZE * Constants.GRID_SIZE + 1,
            height: Constants.BLOCK_SIZE * Constants.GRID_SIZE + 1,
            backgroundColor: 0xffffff
        });

        // add pixi inspector Chrome extension initialization code
        // @ts-ignore
        globalThis.__PIXI_APP__ = app;

        Constants.app = app;

        this.initializeScene();
    }

    public initializeScene() {
        let scene = new Scene();
    }
}
