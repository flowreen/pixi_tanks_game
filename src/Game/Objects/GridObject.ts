import { Position, Properties } from "../Data/Constants";

export class GridObject {
    position: Position;
    properties: Properties;

    constructor(position: Position, properties: Properties) {
        this.position = position;
        this.properties = properties;
    }
}
