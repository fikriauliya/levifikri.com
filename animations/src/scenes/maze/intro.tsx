import { Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
import { initExplain, initTwoLayout } from "../libs";
import {
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

export default function* (view: View2D) {
  const random = useRandom();
  const logger = useLogger();
  const explanationSetting = {
    intro: {
      quota: 1,
      slowTime: 1,
      fastTime: 1,
      naration: `\
Pernah main Maze? Penasaran donk gimana cara generate maze secara otomatis? Yuk kita coba!`,
    },
  };
  const explain = initExplain(explanationSetting);
  const { title, content } = initTwoLayout(view);

  yield* explain("intro", function* (time) {
    title().text("Maze Generator");

    const CELL_SIZE = 50;
    const WIDTH = 20;
    const HEIGHT = 20;

    // content().add(<ComplexRect size={CELL_SIZE} borders={[5, 5, 5, 10]} />);

    const grid2D = createRef<Grid2D>();
    content().add(
      <Grid2D
        ref={grid2D}
        rowCount={HEIGHT}
        colCount={WIDTH}
        cellSize={CELL_SIZE}
      />
    );
    grid2D().blockAllBoundaries();
    // content().add(
    //   <Rect
    //     width={WIDTH * CELL_SIZE}
    //     height={HEIGHT * CELL_SIZE}
    //     lineWidth={2}
    //     stroke={"white"}
    //   />
    // );

    // yield* rect().scale(10, time);
    // yield* rect().scale(10, time);
    // yield* all(
    //   ...range(40).map(function* () {
    //     const x = random.nextInt(0, WIDTH - 1);
    //     const y = random.nextInt(0, HEIGHT - 1);
    //     // yield* grid2D().cells[y][x].fill("red", time);
    //   })
    // );

    // yield* waitFor(1);

    yield* grid2D().arrow(1, 1, 1, 2);
    yield* grid2D().arrow(1, 2, 2, 2);
    yield* grid2D().selectCell(0, 0, "yellow", time);
    yield* grid2D().selectCell(1, 1, "yellow", time);
    yield* grid2D().selectCell(2, 2, "yellow", time);

    yield* sequence(
      time,
      ...range((HEIGHT * WIDTH) / 2).map(function* (i) {
        const y = random.nextInt(1, HEIGHT);
        const x = random.nextInt(1, WIDTH);
        // logger.info("block" + y + ", " + x);

        if (random.nextInt(0, 2) == 0) {
          yield* grid2D().unblockColBoundary(y, x, time);
        } else {
          yield* grid2D().unblockRowBoundary(y, x, time);
        }
      })
    );
    yield* waitFor(5);
  });
}
