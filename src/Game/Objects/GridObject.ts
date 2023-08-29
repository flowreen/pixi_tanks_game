import { Position, Properties } from "../Data/GameConstants";

/**
 * The GridObject class is a base class for all objects that appear on the game grid.
 * This includes tanks, bullets, walls, and hays.
 */
export class GridObject {
    position: Position;
    properties: Properties;

    constructor(position: Position, properties: Properties) {
        this.position = position;
        this.properties = properties;
    }
}
