import { Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
import { initExplain, initTwoLayout } from "../libs";
import {
  all,
  createRef,
  makeRef,
  range,
  useRandom,
  waitFor,
  waitTransition,
} from "@motion-canvas/core";
import { Grid2D } from "../../components/grid";
import { ComplexRect } from "../../components/complexRect";

export default function* (view: View2D) {
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

    const CELL_SIZE = 30;
    const WIDTH = 15;
    const HEIGHT = 15;

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
    const random = useRandom();
    // yield* all(
    //   ...range(40).map(function* () {
    //     const x = random.nextInt(0, WIDTH - 1);
    //     const y = random.nextInt(0, HEIGHT - 1);
    //     // yield* grid2D().cells[y][x].fill("red", time);
    //   })
    // );
    yield* waitFor(time);
  });
}
