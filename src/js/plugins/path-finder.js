export class PathFinder extends Phaser.Plugin {
    constructor(game, parent) {
        super(game, parent);

        this.easy_star = new EasyStar.js();
        this.easy_star.enableDiagonals();
        this.easy_star.disableCornerCutting();
    }

    init(world_grid, acceptable_tiles, tile_dimensions) {
        let grid_row,
            grid_column,
            grid_indices;

        this.grid_dimensions = {row: world_grid.length, column: world_grid[0].length};

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

        origin_coord = this.getCoordFromPoint(origin);
        target_coord = this.getCoordFromPoint(target);

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
                path_positions.push(this.getPointFromCoord({row: path_coord.y, column: path_coord.x}));
            }, this);
        }

        callback.call(context, path_positions);
    }

    outsideGrid(coord) {
        return coord.row < 0 || coord.row > this.grid_dimensions.row - 1 || coord.column < 0 || coord.column > this.grid_dimensions.column - 1;
    }

    getCoordFromPoint(point) {
        let row,
            column;

        row = Math.floor(point.y / this.tile_dimensions.y);
        column = Math.floor(point.x / this.tile_dimensions.x);

        return {row: row, column: column};
    }

    getPointFromCoord(coord) {
        let x,
            y;

        x = (coord.column * this.tile_dimensions.x) + (this.tile_dimensions.x / 2);
        y = (coord.row * this.tile_dimensions.y) + (this.tile_dimensions.y / 2);

        return new Phaser.Point(x, y);
    }
}
