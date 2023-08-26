import * as PIXI from 'pixi.js';
import {BulletObject} from "./BulletObject";
import {Constants} from "../Data/Constants";

type Position = {
    x: number; y: number;
};

export class TankObject {
    sprite: PIXI.Sprite;
    bullets: BulletObject[] = [];
    position: Position;

    constructor(texture: string, position: Position) {
        this.sprite = PIXI.Sprite.from(texture);
        this.position = position;
    }

    fire(): void {
        const bullet = new BulletObject('assets/bullet.png', this.position);
        this.bullets.push(bullet);
        // Add bullet sprite to the stage
        Constants.app.stage.addChild(bullet.sprite);
    }
}
