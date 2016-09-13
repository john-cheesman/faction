import { dimensions } from '../constants/dimensions';

export class Utility {
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
}

function pad(val) {
    let valString = `${val}`;

    if(valString.length < 2) {
        return `0${valString}`;
    }
    else {
        return valString;
    }
}
