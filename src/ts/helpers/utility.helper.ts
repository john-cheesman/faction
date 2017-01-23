import dimensions from '../constants/dimensions';

export default class UtilityHelper {
    static filterArray(array: any[], key: string, value: any) {
        return array.filter((object: any) => {
            return object[key] === value;
        });
    }

    static setPositionByTile(object, position) {
        object.x = (position[0] * dimensions.tileSize);
        object.y = (position[1] * dimensions.tileSize);
    }

    static displayTime(seconds: number): { minutes: string, seconds: string } {
        let roundedSeconds;

        roundedSeconds = Math.round(seconds);

        return {
            minutes: this.pad(roundedSeconds / 60),
            seconds: this.pad(roundedSeconds % 60)
        };
    }

    static offsetCameraPosition(camera: Phaser.Camera, targetPosition: Phaser.Point) {
        targetPosition.x += camera.position.x - (camera.width / 2);
        targetPosition.y += camera.position.y - (camera.height / 2);

        return targetPosition;
    }

    static getCoordFromPoint(point: Phaser.Point, tileDimensions: { x: number, y: number }) {
        let row,
            column;

        row = Math.floor(point.y / tileDimensions.y);
        column = Math.floor(point.x / tileDimensions.x);

        return { row: row, column: column };
    }

    static getPointFromCoord(coord: { column: number, row: number }, tileDimensions: { x: number, y: number }) {
        let x,
            y;

        x = (coord.column * tileDimensions.x) + (tileDimensions.x / 2);
        y = (coord.row * tileDimensions.y) + (tileDimensions.y / 2);

        return new Phaser.Point(x, y);
    }

    static isAdjacent(primaryPosition: Phaser.Point, secondaryPosition: Phaser.Point, tileDimensions: { x: number, y: number }): boolean {
        let deltas;

        deltas = this.compareCoords(primaryPosition, secondaryPosition, tileDimensions);

        return (deltas.rowDelta === 0 && deltas.columnDelta === 1) || (deltas.columnDelta === 0 && deltas.rowDelta === 1);
    }

    static isOnTop(primaryPosition: Phaser.Point, secondaryPosition: Phaser.Point, tileDimensions: { x: number, y: number }): boolean {
        let deltas;

        deltas = this.compareCoords(primaryPosition, secondaryPosition, tileDimensions);

        return deltas.rowDelta === 0 && deltas.columnDelta === 0;
    }

    static compareCoords(primaryPosition: Phaser.Point, secondaryPosition: Phaser.Point, tileDimensions: { x: number, y: number }) {
        let primaryCoord,
            secondaryCoord,
            columnDelta,
            rowDelta;

        primaryCoord = this.getCoordFromPoint(primaryPosition, tileDimensions);
        secondaryCoord = this.getCoordFromPoint(secondaryPosition, tileDimensions);
        columnDelta = primaryCoord.column - secondaryCoord.column;
        rowDelta = primaryCoord.row - secondaryCoord.row;

        columnDelta *= columnDelta < 0 ? -1 : 1;
        rowDelta *= rowDelta < 0 ? -1 : 1;

        return {
            columnDelta: columnDelta,
            rowDelta: rowDelta
        };
    }

    static pad(val: number): string {
        let valString = `${val}`;

        if (valString.length < 2) {
            return `0${valString}`;
        }
        else {
            return valString;
        }
    }
}
