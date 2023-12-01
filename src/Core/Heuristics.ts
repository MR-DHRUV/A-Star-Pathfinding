import Cell from "./Cell";

// different hueristic functions
export function eucledianDistance(a: Cell, b: Cell) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function manHattonDistance(a: Cell, b: Cell) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// No hueuristic information
export function actLikeDijkstra(a: Cell, b: Cell) {
    return 0;
}