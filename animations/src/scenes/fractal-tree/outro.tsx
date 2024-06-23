import {
  Layout,
  LezerHighlighter,
  Line,
  View2D,
  Code,
} from "@motion-canvas/2d";
import {
  ThreadGenerator,
  Vector2,
  all,
  beginSlide,
  createRef,
} from "@motion-canvas/core";
import { loopUntilSlide, initTwoLayout } from "../libs";
import { parser } from "@lezer/javascript";

Code.defaultHighlighter = new LezerHighlighter(parser);

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

  yield* line().end(1, 0.5);

  const angle = () => Math.random() * 40 + 5;
  const nextRightDirection = direction.rotate(angle());
  const nextLeftDirection = direction.rotate(-angle());
  const nextLen = len * 0.75;
  yield* all(
    drawFractal(view, endPos, nextRightDirection, nextLen),
    drawFractal(view, endPos, nextLeftDirection, nextLen)
  );
}

const UNIT = 150;
export default function* (view: View2D) {
  const { title, content } = initTwoLayout(view);

  yield* beginSlide("Last Slide");
  title().text("Random Angles");

  const len = 300;
  const startPos = new Vector2(0, content().height() / 2);
  const direction = new Vector2(0, -1);

  yield* loopUntilSlide("Terminate Slide", () => {
    content().removeChildren();
    return drawFractal(content(), startPos, direction, len);
  });
}
