/// <reference path="../../../node_modules/easystarjs/index.d.ts" />

import Utility from '../helpers/utility.helper';
import * as EasyStar from 'easystarjs';

export default class PathFinderPlugin extends Phaser.Plugin {
    constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
        super(game, parent);

        this.easy_star = new EasyStar.js();
        this.easy_star.enableDiagonals();
        this.easy_star.disableCornerCutting();
    }

    public easy_star: EasyStar.js;

    init(world_grid, acceptable_tiles, tile_dimensions) {
        let grid_row,
            grid_column,
            grid_indices;

        this.grid_dimensions = { row: world_grid.length, column: world_grid[0].length };

        grid_indices = [];

        for (grid_row = 0; grid_row < world_grid.length; grid_row += 1) {
            grid_indices[grid_row] = [];

            for (grid_column = 0; grid_column < world_grid[grid_row].length; grid_column += 1) {
                grid_indices[grid_row][grid_column] = world_grid[grid_row][grid_column].index;
            }
        }

        this.easy_star.setGrid(grid_indices);
        this.easy_star.setAcceptableTiles(acceptable_tiles);

        this.tile_dimensions = tile_dimensions;
    }

    findPath(origin, target, callback, context) {
        let origin_coord,
            target_coord;

        origin_coord = Utility.getCoordFromPoint(origin, this.tile_dimensions);
        target_coord = Utility.getCoordFromPoint(target, this.tile_dimensions);

        if (!this.outsideGrid(origin_coord) && !this.outsideGrid(target_coord)) {
            this.easy_star.findPath(origin_coord.column, origin_coord.row, target_coord.column, target_coord.row, this.callCallbackFunction.bind(this, callback, context));
            this.easy_star.calculate();

            return true;
        }
        else {
            return false;
        }
    }

    callCallbackFunction(callback, context, path) {
        let path_positions;

        path_positions = [];

        if (path !== null) {
            path.forEach(function (path_coord) {
                path_positions.push(Utility.getPointFromCoord({ row: path_coord.y, column: path_coord.x }, this.tile_dimensions));
            }, this);
        }

        callback.call(context, path_positions);
    }

    outsideGrid(coord) {
        return coord.row < 0 || coord.row > this.grid_dimensions.row - 1 || coord.column < 0 || coord.column > this.grid_dimensions.column - 1;
    }
}
