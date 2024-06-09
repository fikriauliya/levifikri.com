import {
  Layout,
  LezerHighlighter,
  Line,
  View2D,
  makeScene2D,
  Code,
  CodeSignal,
  CODE,
  Circle,
  QuadBezier,
  DefaultHighlightStyle,
  Txt,
} from "@motion-canvas/2d";
import {
  ThreadGenerator,
  Vector2,
  all,
  beginSlide,
  createRef,
  useLogger,
  waitUntil,
} from "@motion-canvas/core";
import { loopUntilSlide, initTwoLayout, initTwoSimilarLayout } from "./libs";
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

function* explainFractal(
  drawView: Layout,
  codeView: CodeSignal<void>,
  startPos: Vector2,
  direction: Vector2,
  len: number,
  depth: number
): ThreadGenerator {
  const logger = useLogger();
  if (depth > 2) {
    return;
  }
  const line = createRef<Line>();
  const endPos = startPos.add(direction.scale(len));

  drawView.add(
    <>
      <Circle position={startPos} fill={"red"} size={20} />
      <Txt
        position={startPos.addX(80)}
        text={`from`}
        fill={"yellow"}
        fontSize={40}
      />
      <Circle position={endPos} fill={"red"} size={20} />
      <Txt
        position={endPos.addX(80)}
        text={`to`}
        fill={"yellow"}
        fontSize={40}
      />
    </>
  );
  if (depth == 0) {
    yield* codeView.append(2)`\
  let from = pos;
  let to = pos + dir * len;\n`;
  }
  // Draw solid line
  drawView.add(
    <Line
      ref={line}
      points={[startPos, endPos]}
      stroke={"white"}
      lineWidth={8}
      radius={40}
      end={0}
    />
  );

  if (depth == 0) {
    yield* all(
      line().end(1, 2),
      codeView.append(2)`\
  drawLine(from, to);\n`
    );
  } else {
    yield* line().end(1, 2);
  }

  // Explanation
  yield* waitUntil(`${len}`);

  // Draw dotted line
  const dottedLen = len * 0.75;
  const dottedDirection = Vector2.createSignal(direction);
  const dottedStartPos = endPos;
  const dottedEndPos = Vector2.createSignal(() => {
    return dottedStartPos.add(dottedDirection().scale(dottedLen));
  });

  const dottedLine = createRef<Line>();
  drawView.add(
    <Line
      ref={dottedLine}
      points={[dottedStartPos, () => dottedEndPos()]}
      stroke={"white"}
      lineWidth={8}
      radius={40}
      end={0}
      opacity={0.5}
    />
  );
  yield* dottedLine().end(1, 2);
  if (depth == 0) {
    yield* all(
      dottedDirection(dottedDirection().rotate(30), 2),
      codeView.append(2)`\
  const rightDir = rotate(dir, 30);
  drawFractal(endPos, rightDir, nextLen);\n`
    );
  } else {
    yield* dottedDirection(dottedDirection().rotate(30), 2);
  }

  // recurse to the right
  const nextLen = len * 0.75;
  const nextDirection = direction.rotate(30);
  yield* explainFractal(
    drawView,
    codeView,
    endPos,
    nextDirection,
    nextLen,
    depth + 1
  );

  // yield* waitUntil("Third Slide");
}

function* slide1(view: View2D) {
  const { title, content } = initTwoLayout(view);

  yield* beginSlide("First Slide");
  title().text("Fractal Tree & Recursion");

  const len = 300;
  const startPos = new Vector2(0, content().height() / 2);
  const direction = new Vector2(0, -1);

  yield* loopUntilSlide("Second Slide", () => {
    content().removeChildren();
    return drawFractal(content(), startPos, direction, len);
  });
}

function* slide2(view: View2D) {
  const { topContent, bottomContent } = initTwoSimilarLayout(view);

  const len = 300;
  const startPos = new Vector2(0, topContent().height() / 2);
  const direction = new Vector2(0, -1);

  const code = Code.createSignal(CODE``);
  bottomContent().add(
    <Code
      fontSize={40}
      code={CODE`
function drawFractal(pos, dir, len) {
${code}}`}
    />
  );

  topContent().removeChildren();

  yield* explainFractal(topContent(), code, startPos, direction, len, 0);
}

export default makeScene2D(function* (view) {
  yield* slide1(view);
  yield* slide2(view);
});
