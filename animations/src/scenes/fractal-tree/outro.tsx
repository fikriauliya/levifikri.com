import {
  Layout,
  LezerHighlighter,
  Line,
  View2D,
  Code,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  Direction,
  ThreadGenerator,
  Vector2,
  all,
  beginSlide,
  cancel,
  createRef,
  loop,
  loopUntil,
  slideTransition,
  waitUntil,
} from "@motion-canvas/core";
import { loopUntilSlide, initTwoLayout, initExplain } from "../libs";
import { parser } from "@lezer/javascript";

Code.defaultHighlighter = new LezerHighlighter(parser);

function* drawFractal(
  view: Layout,
  startPos: Vector2,
  direction: Vector2,
  len: number,
  time: number
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

  yield* line().end(1, time);

  const angle = () => Math.random() * 40 + 5;
  const nextRightDirection = direction.rotate(angle());
  const nextLeftDirection = direction.rotate(-angle());
  const nextLen = len * 0.75;
  yield* all(
    drawFractal(view, endPos, nextRightDirection, nextLen, time),
    drawFractal(view, endPos, nextLeftDirection, nextLen, time)
  );
}

const UNIT = 150;
export default function* (view: View2D) {
  const { title, content } = initTwoLayout(view);

  const explanationSetting = {
    outro: {
      quota: 1,
      slowTime: 0.2,
      fastTime: 1,
      naration: `\
Ini adalah pohon fractal, sebuah pola yang terlihat kompleks namun sebenarnya sangat mudah dibuat hanya dengan mengulang pola yang sama berulang-ulang kali.

Yuk kita bikin pohon fractal! `,
    },
  };
  const explain = initExplain(explanationSetting);

  yield* explain("outro", function* (time) {
    title().text("Fractal Tree & Recursion");

    const len = 300;
    const startPos = new Vector2(0, content().height() / 2);
    const direction = new Vector2(0, -1);

    yield loop(Infinity, function* () {
      content().removeChildren();
      yield* drawFractal(content(), startPos, direction, len, time);
    });
  });
}
