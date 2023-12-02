"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import Grid from '@/Core/Grid';
import Astar from '@/Core/A_star';
import Link from 'next/link';


export default function Home() {

    // rows, cols and obstacles and hueristic
    const [divisions, setDivions] = useState<number>(50);
    const [obs, setObs] = useState<number>(1200);
    const [hueristic, setHueristic] = useState<number>(0);
    const [newGrid, setNewGrid] = useState<boolean>(false);
    const [side, setSide] = useState<number>(100);
    const [steps, setSteps] = useState<number>(0);

    // Init maze
    const Maze = useMemo(() => new Grid(divisions, divisions, obs), [divisions, obs]);

    // drawing on canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // generate new maze/grid
    const drawMaze = () => {
        Maze.genGrid();
        setNewGrid(!newGrid);
    }

    // mount the current width and height
    useEffect(() => {
        setSide(Math.min(window.innerWidth, window.innerHeight) - (Math.min(window.innerWidth, window.innerHeight) / 10))
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        Maze.renderGrid(context, side / divisions, side / divisions);
    }, [newGrid, divisions, obs, Maze, side]);

    // update obs when divisions change
    useEffect(() => {
        setObs(divisions * divisions * 0.50);
    }, [divisions]);

    return (
        <main className='p-3'>
            <div className="d-flex flex-row flex-wrap gap-5">

                <div><canvas id="grid-canvas" ref={canvasRef} width={side} height={side} ></canvas></div>

                <div className="d-flex flex-column gap-3 controls">

                    <h1 className='fw-semibold'>A* Pathfinding</h1>

                    <h5 className='mt-2 mb-0'>Controls:</h5>
                    {/* Buttons */}
                    <div className="d-flex flex-row gap-4" style={{ height: "min-content" }}>
                        <button className='btn btn-outline-primary' onClick={drawMaze}>Generate new grid</button>

                        <button className='btn btn-outline-success' onClick={() => {
                            Astar(Maze, setNewGrid, divisions, divisions, Maze.grid[0][0], Maze.grid[divisions - 1][divisions - 1], hueristic, setSteps);
                        }}>Start A*</button>
                    </div>

                    {/* Hueristic Controls */}
                    <div className="d-flex flex-row gap-4" style={{ height: "min-content" }}>
                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="hueristic">Hueristic Function:</label>
                            <select name="hueristic" id="" className='form-select hue-select' value={hueristic} onChange={(e) => { setHueristic(Number(e.target.value)) }} >
                                <option value={0}>Eucledian</option>
                                <option value={1}>Manhattan</option>
                                <option value={2}>Act like Dijkstra&#39;s </option>
                            </select>
                        </div>
                    </div>

                    {/* Grid Controls */}
                    <div className="d-flex flex-row gap-4" style={{ height: "min-content" }}>

                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="divisions">Grid divisions:</label>
                            <input type="range" className="form-range" id="divisions" min="10" max="100" value={divisions} onChange={(e) => { setDivions(Number(e.target.value)) }} />
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <label htmlFor="obstacles">Obstacles:</label>
                            <input type="range" className="form-range" id="obstacles" min={divisions * divisions * 0.2} max={(divisions * divisions * 0.90)} value={obs} onChange={(e) => { setObs(Number(e.target.value)) }} />
                        </div>
                    </div>

                    <div className="d-flex flex-row gap-4" style={{ height: "min-content" }}>
                        <p> Distance: {steps} Cells</p>
                    </div>

                    {/* Legend */}
                    <div className="d-flex flex-column gap-1 my-2" style={{ height: "min-content" }}>
                        <h5>Legend:</h5>
                        <div className="d-flex flex-row gap-4">
                            <div className="d-flex flex-row gap-1 align-items-center">
                                <div className="legend-cell-green"></div>
                                <p className='mb-0'>Open Set</p>
                            </div>
                            <div className="d-flex flex-row gap-1 align-items-center">
                                <div className="legend-cell-red"></div>
                                <p className='mb-0'>Closed Set</p>
                            </div>
                            <div className="d-flex flex-row gap-1 align-items-center">
                                <div className="legend-cell-blue"></div>
                                <p className='mb-0'>Path</p>
                            </div>
                        </div>
                    </div>

                    {/* A* info container*/}
                    <div className="d-flex flex-column container bg-mygreen rounded p-3 gap-4 info-container">
                        <div className="banner d-flex flex-row align-items-center gap-3 text-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg>
                            <h4 className='mb-0 fw-semibold'>A* Algorithm</h4>
                        </div>
                        <p className='text-muted'>A* is a smart and efficient algorithm used to find the shortest path from one point to another in a maze or graph. Imagine you&#39;re exploring a maze, and you want to reach a specific destination. A* helps you figure out the best way to get there by considering both the distance you&#39;ve already traveled and an estimate of how much more distance you have to cover.
                            <br />
                            <br />
                            For nerds<strong> (LIKE ME)</strong> A* is a slight modification to Dijkstra&#39;s Algorithm that uses heuristics to cause directional search to avoid searching in redundant directions. </p>
                    </div>

                    {/* Hueristic info container*/}
                    <div className="d-flex flex-column container bg-info-subtle rounded p-3 gap-4 info-container">
                        <div className="banner d-flex flex-row align-items-center gap-3 text-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg>
                            <h4 className='mb-0 fw-semibold'>Differnt Heuristics</h4>
                        </div>
                        <div>
                            <img src="/images/info.png" alt="" height={250} />
                        </div>
                        <div>
                            <p>Manhattan distance measures the distance between two points as the sum of the absolute differences in their coordinates, while Euclidean distance calculates it as the straight-line distance between the points.</p>
                        </div>
                    </div>

                </div>
            </div>
            <h5 className='text-center mt-4'>
                Source code <Link target='_blank' href="https://github.com/MR-DHRUV/A-Star-Pathfinding">here</Link> <span className='text-danger'>❤</span>
            </h5>
        </main>
    );
}
