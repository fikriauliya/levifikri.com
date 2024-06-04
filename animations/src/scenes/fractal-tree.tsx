import { Layout, Line, Txt, View2D, makeScene2D } from "@motion-canvas/2d";
import {
  ThreadGenerator,
  Vector2,
  all,
  beginSlide,
  createRef,
  useLogger,
} from "@motion-canvas/core";
import { loopUntilSlide } from "../libs";

const topMargin = 200;
const bottomMargin = 350;

function* drawFractal(
  view: View2D,
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
      stroke={"black"}
      lineWidth={8}
      radius={40}
      end={0}
    />
  );

  yield* line().end(1, 0.25);

  const angle = () => Math.random() * 25 + 10;
  const nextRightDirection = direction.rotate(angle());
  const nextLeftDirection = direction.rotate(-angle());
  const nextLen = len * 0.75;
  yield* all(
    drawFractal(view, endPos, nextRightDirection, nextLen),
    drawFractal(view, endPos, nextLeftDirection, nextLen)
  );
}

export default makeScene2D(function* (view) {
  const logger = useLogger();
  const line = createRef<Line>();

  const title = createRef<Txt>();

  yield* beginSlide("First Slide");
  const titlePosition = new Vector2(0, -view.height() / 2 + topMargin);
  view.add(
    <Txt
      ref={title}
      text={"Fractal Tree and Recursion"}
      fontSize={80}
      fontFamily={"Futura"}
      position={titlePosition}
    />
  );

  const len = 300;
  const startPos = new Vector2(0, view.height() / 2 - bottomMargin);
  const direction = new Vector2(0, -1);

  const fractalView = createRef<View2D>();
  view.add(<Layout ref={fractalView} position={new Vector2(0, 0)} />);
  yield* loopUntilSlide("Second Slide", () => {
    fractalView().removeChildren();
    return drawFractal(fractalView(), startPos, direction, len);
  });

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
