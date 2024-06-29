import { View2D } from "@motion-canvas/2d";
import { initExplain, initTwoLayout } from "../libs";
import {
  Random,
  ThreadGenerator,
  createRef,
  useLogger,
  useRandom,
} from "@motion-canvas/core";
import { Grid2D, Cell as GridCell } from "../../components/Grid";

// [x, y]
class Cell {
  constructor(public x: number, public y: number) {}

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  equals(other: Cell): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

function* generateMaze(
  pos: Cell,
  visited: boolean[][],
  // hashmap of (x, y) -> [(x, y)]
  connection: Map<string, Cell[]>,
  random: Random,
  grid: Grid2D,
  time: number
): ThreadGenerator {
  const logger = useLogger();
  const [x, y] = [pos.x, pos.y];
  visited[y][x] = true;
  let directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  directions = directions.sort(() => random.nextInt(-1, 1));

  if (!connection.has(pos.toString())) {
    connection.set(pos.toString(), []);
  }
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || ny < 0 || nx >= visited[0].length || ny >= visited.length) {
      continue;
    }

    if (visited[ny][nx]) {
      continue;
    }

    if (nx == x) {
      yield* grid.unblockBoundary(
        new GridCell(nx, Math.max(y, ny)),
        "row",
        time
      );
      //upsert connection
    }
    if (ny == y) {
      yield* grid.unblockBoundary(
        new GridCell(Math.max(x, nx), ny),
        "col",
        time
      );
    }

    const to = new Cell(nx, ny);
    connection.get(pos.toString()).push(to);
    if (!connection.has(to.toString())) {
      connection.set(to.toString(), []);
    }
    connection.get(to.toString()).push(pos);

    yield* generateMaze(
      new Cell(nx, ny),
      visited,
      connection,
      random,
      grid,
      time
    );
  }
}

function* solve(
  cur: Cell,
  to: Cell,
  visited: boolean[][],
  connection: Map<string, Cell[]>,
  grid: Grid2D,
  found: { value: boolean },
  time: number
): ThreadGenerator {
  const logger = useLogger();
  const [x, y] = [cur.x, cur.y];
  const [toX, toY] = [to.x, to.y];

  visited[y][x] = true;
  let directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  if (x == toX && y == toY) {
    return;
  }

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    // out of bound
    if (nx < 0 || ny < 0 || nx >= visited[0].length || ny >= visited.length) {
      continue;
    }

    // visited before
    if (visited[ny][nx]) {
      continue;
    }

    if (
      connection.has(cur.toString()) &&
      connection.get(cur.toString()).find((c) => c.equals(new Cell(nx, ny)))
    ) {
      yield* grid.putCell(
        "path",
        new GridCell(nx, ny),
        "yellow",
        "circle",
        time
      );
      yield* grid.selectCell(new GridCell(x, y), "orange", "rectangle", time);

      yield* solve(
        new Cell(nx, ny),
        to,
        visited,
        connection,
        grid,
        found,
        time
      );

      yield* grid.deselectCell(new GridCell(x, y), time);
    }
  }
}

export default function* (view: View2D) {
  const random = useRandom();
  const logger = useLogger();
  const explanationSetting = {
    generate: {
      quota: 3,
      slowTime: 0.01,
      fastTime: 0.001,
      naration: `\
Pernah main Maze? Penasaran donk gimana cara generate maze secara otomatis? Yuk kita coba!`,
    },
    putStartEnd: {
      quota: 3,
      slowTime: 1,
      fastTime: 1,
      naration: `\
Pernah main Maze? Penasaran donk gimana cara generate maze secara otomatis? Yuk kita coba!`,
    },
    solve: {
      quota: 3,
      slowTime: 0.05,
      fastTime: 0.01,
      naration: `\
Pernah main Maze? Penasaran donk gimana cara generate maze secara otomatis? Yuk kita coba!`,
    },
  };
  const explain = initExplain(explanationSetting);
  const { title, content } = initTwoLayout(view);

  const grid2D = createRef<Grid2D>();
  const CELL_SIZE = 50;
  const WIDTH = 20;
  const HEIGHT = 20;
  const connection = new Map<string, Cell[]>();

  const startPos = {
    col: random.nextInt(0, WIDTH - 1),
    row: random.nextInt(0, HEIGHT - 1),
  };
  const endPos = {
    col: random.nextInt(0, WIDTH - 1),
    row: random.nextInt(0, HEIGHT - 1),
  };

  yield* explain("generate", function* (time) {
    title().text("Maze Generator");

    const visited: boolean[][] = [];
    for (let i = 0; i < HEIGHT; i++) {
      visited.push(new Array(WIDTH).fill(false));
    }

    // select random position
    const x = random.nextInt(0, WIDTH - 1);
    const y = random.nextInt(0, HEIGHT - 1);

    content().add(
      <Grid2D
        ref={grid2D}
        rowCount={HEIGHT}
        colCount={WIDTH}
        cellSize={CELL_SIZE}
      />
    );
    grid2D().blockAllBoundaries();

    yield* generateMaze(
      new Cell(x, y),
      visited,
      connection,
      random,
      grid2D(),
      time
    );

    // draw startPos
    // yield* grid2D().selectCell(startPos, "green", "rectangle", time);
    // // draw endPos
    // yield* grid2D().selectCell(endPos, "red", "circle", time);
    // yield* grid2D().selectCell(endPos, "blue", "rectangle", time);

    // yield* waitFor(1);
    // yield* grid2D().deselectCell(startPos, time);
    yield* grid2D().putCell(
      "start",
      new GridCell(startPos.col, startPos.row),
      "yellow",
      "circle",
      time
    );
    yield* grid2D().putCell(
      "end",
      new GridCell(endPos.col, endPos.row),
      "green",
      "rectangle",
      time
    );
  });
  yield* explain("solve", function* (time) {
    const visited: boolean[][] = [];
    for (let i = 0; i < HEIGHT; i++) {
      visited.push(new Array(WIDTH).fill(false));
    }
    yield* solve(
      new Cell(startPos.col, startPos.row),
      new Cell(endPos.col, endPos.row),
      visited,
      connection,
      grid2D(),
      { value: false },
      time
    );
  });
}
