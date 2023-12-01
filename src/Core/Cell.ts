// 8 directional nbr 
const dx: number[] = [-1, 0, 1, 0, -1, -1, 1, 1];
const dy: number[] = [0, 1, 0, -1, -1, 1, -1, 1];

export default class Cell {
    f: number; // f = g + h
    g: number; // distance from start
    h: number; // hueuristic distance from end
    x: number; // x coordinate
    y: number; // y coordinate
    wall: boolean; // obstacle
    color: string; 
    previous: Cell | null; // previous cell
    nbr: Cell[];

    // constructor
    constructor(i: number, j: number) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.x = i;
        this.y = j;
        this.previous = null;
        this.nbr = [];
        this.wall = false;
        this.color = "white";
    }

    // generate neighbours
    genNbr(grid: Cell[][]) {
        let rows = grid.length, cols = grid[0].length;
        
        for (let k = 0; k < 8; k++) {
            let x = this.x + dx[k], y = this.y + dy[k];
            if (x >= 0 && x < cols && y >= 0 && y < rows)
                this.nbr.push(grid[x][y]);
        }
    }

    // reset cell
    reset() {
        this.f = 0;
        this.g = 0;
        this.h = 0;;
        this.color = this.wall ? "black" : "white";
        this.previous = null;
    }
}