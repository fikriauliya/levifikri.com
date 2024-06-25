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
    const WIDTH = 30;
    const HEIGHT = 30;

    const cells: Rect[][] = [];
    const grid = <Layout layout={true} direction={"column"} />;
    for (let i = 0; i < HEIGHT; i++) {
      const rows: Rect[] = [];
      const innerLayout = createRef<Layout>();
      grid.add(<Layout ref={innerLayout} layout={true} />);
      for (let j = 0; j < WIDTH; j++) {
        innerLayout().add(
          <Rect
            width={CELL_SIZE}
            height={CELL_SIZE}
            stroke={"white"}
            lineWidth={2}
            lineCap={"round"}
            ref={makeRef(rows, j)}
          />
        );
      }
      cells.push(rows);
    }
    content().add(grid);

    // yield* rect().scale(10, time);
    // yield* rect().scale(10, time);
    const random = useRandom();
    yield* all(
      ...range(40).map(function* () {
        const x = random.nextInt(0, WIDTH - 1);
        const y = random.nextInt(0, HEIGHT - 1);
        yield* cells[y][x].fill("red", time);
      })
    );
    yield* waitFor(time);
  });
}
