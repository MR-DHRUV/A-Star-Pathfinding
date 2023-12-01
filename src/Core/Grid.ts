import Cell from "./Cell";

export default class Grid {
    rows: number;
    cols: number;
    obs: number; // number of obstacles
    grid: Cell[][];

    constructor(rows: number, cols: number, obs: number) {
        this.rows = rows;
        this.cols = cols;
        this.obs = obs;
        this.grid = new Array(cols);

        // initialize grid
        for (let i = 0; i < cols; i++) {
            this.grid[i] = new Array(rows);
        }

        // initialize cells
        this.genGrid();
    }

    genNbr() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j].genNbr(this.grid);
            }
        }
    }

    genObstacles() {
        for (let i = 0; i < this.obs; i++) {
            let x = Math.floor(Math.random() * this.cols);
            let y = Math.floor(Math.random() * this.rows);

            if (x != 0 && y != 0 && x != this.cols - 1 && y != this.rows - 1)
            {
                this.grid[x][y].wall = true;
                this.grid[x][y].color = "black";
            }
        }
    }

    genGrid() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++)
                this.grid[i][j] = new Cell(i, j);
        }

        // generate neibours
        this.genNbr();

        // generate obstacles
        this.genObstacles();
    }

    renderGrid(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const cell = this.grid[i][j];

                context.strokeStyle = "black"; // Black boundary
                context.fillStyle = cell.color;
                context.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
                context.strokeRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    }

    resetGrid() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++)
                this.grid[i][j].reset();
        }
    }
}