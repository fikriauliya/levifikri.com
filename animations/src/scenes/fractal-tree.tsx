import { Layout, Line, Txt, View2D, makeScene2D } from "@motion-canvas/2d";
import {
  Reference,
  ThreadGenerator,
  Vector2,
  all,
  beginSlide,
  createRef,
  useLogger,
} from "@motion-canvas/core";
import { loopUntilSlide, initTwoLayout } from "./libs";

function* drawFractal(
  view: Layout,
  startPos: Vector2,
  direction: Vector2,
  len: number
): ThreadGenerator {
  if (len < 50) {
    return;
  }
  const line = createRef<Line>();
  const endPos = startPos.add(direction.scale(len));

  view.add(
    <Line
      ref={line}
      points={[startPos, endPos]}
      stroke={"white"}
      lineWidth={8}
      radius={40}
      end={0}
    />
  );

  yield* line().end(1, 0.25);

  const angle = () => Math.random() * 40 + 5;
  const nextRightDirection = direction.rotate(angle());
  const nextLeftDirection = direction.rotate(-angle());
  const nextLen = len * 0.75;
  yield* all(
    drawFractal(view, endPos, nextRightDirection, nextLen),
    drawFractal(view, endPos, nextLeftDirection, nextLen)
  );
}

function* slide1(view: View2D) {
  const { title, content } = initTwoLayout(view);

  // logger.info(title().toString());

  yield* beginSlide("First Slide");
  title().text("Fractal Tree and Recursion");

  const len = 300;
  const startPos = new Vector2(0, content().height());
  const direction = new Vector2(0, -1);

  yield* loopUntilSlide("Second Slide", () => {
    content().removeChildren();
    return drawFractal(content(), startPos, direction, len);
  });
}

function* slide2(view: View2D) {
  view.removeChildren();
}

export default makeScene2D(function* (view) {
  const logger = useLogger();
  const line = createRef<Line>();

  yield* slide1(view);
  yield* slide2(view);

  // const nextLine = createRef<Line>();
  // len = len * 0.7;

  // startPos = endPos;
  // let directionSignal = Vector2.createSignal(new Vector2(0, -len));
  // let endPosSignal = Vector2.createSignal(() =>
  //   startPos.add(directionSignal())
  // );

  // view.add(
  //   <Line
  //     ref={nextLine}
  //     points={[startPos, () => endPosSignal()]}
  //     stroke={"black"}
  //     lineWidth={8}
  //     radius={40}
  //     end={0}
  //     lineDash={[10, 10]}
  //   />
  // );

  // yield* nextLine().end(1, 1);

  // yield* directionSignal(directionSignal().rotate(angle), 1);
  // yield* nextLine().lineDash([0, 0], 1);
  // yield* waitFor(1);
});
