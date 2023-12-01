import Cell from "./Cell";
import Grid from "./Grid";
import { eucledianDistance, manHattonDistance, actLikeDijkstra } from "./Heuristics";

export default function Astar(Maze: Grid, setNewGrid: React.Dispatch<React.SetStateAction<boolean>>, cols: number, rows: number, start: Cell, end: Cell, heuristic: number) {

    // Reset the grid
    Maze.resetGrid();

    // Inital data structures
    let openSet: Cell[] = [start];
    let closedSet: Cell[] = [];
    let path: Cell[] = [];

    // creating a 2-d array to track elements for O(1) search
    let inClosedSet: boolean[][] = new Array(cols).fill([]).map(() => new Array(rows).fill(false));
    let inOpenSet: boolean[][] = new Array(cols).fill([]).map(() => new Array(rows).fill(false));

    // select hueuristic function
    function h(a: Cell, b: Cell) { 
        switch (heuristic) {
            case 0:
                return eucledianDistance(a, b);
            case 1:
                return manHattonDistance(a, b);
            default:
                return actLikeDijkstra(a, b);
        }
    }

    // A* algorithm function
    const runAStar = () => {
        const step = () => {

            // If open set is not empty
            if (openSet.length > 0) {
                let winner = 0;

                // Finding the node with the lowest f score
                for (let i = 0; i < openSet.length; i++) {
                    if (openSet[i].f < openSet[winner].f) {
                        winner = i;
                    }
                }

                let current = openSet[winner];
                if (current !== end) {
                    updateSets(current);
                }

                // update cells of open set
                openSet.forEach((cell) => {
                    cell.color = 'green';
                });

                // update cells of closed set
                closedSet.forEach((cell) => {
                    cell.color = 'red';
                });

                // update path for current state
                let temp = current;
                let tempPath = [];

                while (temp.previous) {
                    temp.color = 'blue';
                    tempPath.push(temp.previous);
                    temp = temp.previous;
                }

                // Update React state to trigger a re-render
                setNewGrid((prev) => !prev);

                if (current === end) {
                    return;
                }

                // Continue to the next step
                requestAnimationFrame(step);
            }
        };

        // Start the A* algorithm
        step();
    };


    // Helper function to update sets and check neighbors
    const updateSets = (current: Cell) => {
        // Remove current from open set
        const index = openSet.indexOf(current);
        if (index > -1) {
            openSet.splice(index, 1);
        }

        // Add current to closed set
        closedSet.push(current);
        inClosedSet[current.x][current.y] = true;
        current.color = 'red';

        // Check neighbors
        for (let i = 0; i < current.nbr.length; i++) {

            const nbr = current.nbr[i];

            // Check if neighbor is not in closed set and not the previous node, and not a wall
            if (inClosedSet[nbr.x][nbr.y] === false && nbr.previous !== current && !nbr.wall) {
                let tempG = current.g + 1;
                let betterPath = false;

                // Relax the neighbor
                if (inOpenSet[nbr.x][nbr.y] === true && tempG < nbr.g) {
                    nbr.g = tempG;
                    betterPath = true;
                }
                else {
                    nbr.g = tempG;
                    betterPath = true;
                    openSet.push(nbr);
                    nbr.color = 'green';
                    inOpenSet[nbr.x][nbr.y] = true;
                }

                // Update f if a better path is found
                if (betterPath) {
                    nbr.h = h(nbr, end);
                    nbr.f = nbr.g + nbr.h;
                    nbr.previous = current;
                }
            }
        }
    };

    // Start the A* algorithm
    runAStar();
}
