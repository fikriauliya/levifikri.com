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

    const CELL_SIZE = 50;
    const WIDTH = 30;
    const HEIGHT = 30;

    content().add(<ComplexRect size={CELL_SIZE} borders={[1, 0, 10, 1]} />);

    //   const grid2D = createRef<Grid2D>();
    //   content().add(
    //     <Grid2D
    //       ref={grid2D}
    //       rowCount={HEIGHT}
    //       colCount={WIDTH}
    //       cellSize={CELL_SIZE}
    //     />
    //   );

    //   // yield* rect().scale(10, time);
    //   // yield* rect().scale(10, time);
    //   const random = useRandom();
    //   yield* all(
    //     ...range(40).map(function* () {
    //       const x = random.nextInt(0, WIDTH - 1);
    //       const y = random.nextInt(0, HEIGHT - 1);
    //       yield* grid2D().cells[y][x].fill("red", time);
    //     })
    //   );
    //   yield* waitFor(time);
    // });
  });
}
