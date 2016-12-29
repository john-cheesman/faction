import { dimensions } from '../constants/dimensions';

export default class Utility {
    static filterArray(array, key, value) {
        return array.filter((object) => {
            return object[key] === value;
        });
    }

    static setPositionByTile(object, position) {
        object.x = (position[0] * dimensions.tileSize);
        object.y = (position[1] * dimensions.tileSize);
    }

    static displayTime(seconds) {
        let roundedSeconds;

        roundedSeconds = Math.round(seconds);

        return {
            minutes: pad(parseInt(roundedSeconds / 60)),
            seconds: pad(roundedSeconds % 60)
        };
    }

    static offsetCameraPosition(camera, targetPosition) {
        targetPosition.x += camera.position.x - (camera.width / 2);
        targetPosition.y += camera.position.y - (camera.height / 2);

        return targetPosition;
    }

    static getCoordFromPoint(point, tileDimensions) {
        let row,
            column;

        row = Math.floor(point.y / tileDimensions.y);
        column = Math.floor(point.x / tileDimensions.x);

        return { row: row, column: column };
    }

    static getPointFromCoord(coord, tileDimensions) {
        let x,
            y;

        x = (coord.column * tileDimensions.x) + (tileDimensions.x / 2);
        y = (coord.row * tileDimensions.y) + (tileDimensions.y / 2);

        return new Phaser.Point(x, y);
    }

    static isAdjacent(primaryPosition, secondaryPosition, tileDimensions) {
        let deltas;

        deltas = this.compareCoords(primaryPosition, secondaryPosition, tileDimensions);

        return (deltas.rowDelta === 0 && deltas.columnDelta === 1) || (deltas.columnDelta === 0 && deltas.rowDelta === 1);
    }

    static isOnTop(primaryPosition, secondaryPosition, tileDimensions) {
        let deltas;

        deltas = this.compareCoords(primaryPosition, secondaryPosition, tileDimensions);

        return deltas.rowDelta === 0 && deltas.columnDelta === 0;
    }

    static compareCoords(primaryPosition, secondaryPosition, tileDimensions) {
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
}

function pad(val) {
    let valString = `${val}`;

    if (valString.length < 2) {
        return `0${valString}`;
    }
    else {
        return valString;
    }
}
