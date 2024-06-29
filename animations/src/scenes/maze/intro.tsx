import { Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
import { initExplain, initTwoLayout } from "../libs";
import {
  Random,
  ThreadGenerator,
  all,
  chain,
  createRef,
  makeRef,
  range,
  sequence,
  useLogger,
  useRandom,
  waitFor,
  waitTransition,
  waitUntil,
} from "@motion-canvas/core";
import { Grid2D } from "../../components/Grid";

function* dfs(
  x: number,
  y: number,
  visited: boolean[][],
  random: Random,
  grid: Grid2D,
  time: number
): ThreadGenerator {
  const logger = useLogger();
  visited[y][x] = true;
  let directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  directions = directions.sort(() => random.nextInt(-1, 1));

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
        { row: Math.max(y, ny), col: nx },
        "row",
        time
      );
    }
    if (ny == y) {
      yield* grid.unblockBoundary(
        { row: ny, col: Math.max(x, nx) },
        "col",
        time
      );
    }

    yield* dfs(nx, ny, visited, random, grid, time);
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
    solve: {
      quota: 3,
      slowTime: 0.01,
      fastTime: 0.001,
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

    yield* dfs(x, y, visited, random, grid2D(), time);

    // draw startPos
    yield* grid2D().selectCell(startPos, "green", time);
    // draw endPos
    yield* grid2D().selectCell(endPos, "red", time);

    yield* waitFor(10);
  });

  yield* explain("solve", function* (time) {
    const visited: boolean[][] = [];
  });
}
