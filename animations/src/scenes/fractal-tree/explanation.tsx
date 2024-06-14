import {
  Layout,
  LezerHighlighter,
  Line,
  View2D,
  Code,
  CODE,
  Circle,
  Txt,
} from "@motion-canvas/2d";
import {
  Reference,
  ThreadGenerator,
  Vector2,
  all,
  beginSlide,
  createRef,
  useLogger,
  waitUntil,
} from "@motion-canvas/core";
import { initTwoSimilarLayout, insertOrSelect } from "../libs";
import { parser } from "@lezer/javascript";

Code.defaultHighlighter = new LezerHighlighter(parser);

const UNIT = 150;
function* explainFractal(
  drawView: Layout,
  codeView: Reference<Code>,
  startPos: Vector2,
  direction: Vector2,
  len: number,
  depth: number
): ThreadGenerator {
  const logger = useLogger();
  if (depth > 2) {
    return;
  }
  // const line = createRef<Line>();
  const scaledDirection = Vector2.createSignal(direction.scale(UNIT));
  const endPos = Vector2.createSignal(() => startPos.add(scaledDirection()));

  const dirLine = createRef<Layout>();
  drawView.add(
    <Layout ref={dirLine} opacity={0}>
      <Line
        ref={dirLine}
        points={[startPos, endPos]}
        stroke={"white"}
        fontSize={40}
        lineWidth={8}
        opacity={0.5}
        endArrow
      />
      <Txt
        text={"dir"}
        fill={"yellow"}
        position={() => startPos.add(scaledDirection().div(2)).addX(60)}
      />
    </Layout>
  );
  yield* all(
    insertOrSelect(
      codeView,
      `\
function drawFractal(from, dir, len) {
  `
    ),
    dirLine().opacity(1, 2)
  );

  const label = createRef<Layout>();
  drawView.add(
    <Layout opacity={0} ref={label}>
      <Circle position={startPos} fill={"yellow"} size={20} />
      <Txt
        position={startPos.addX(80)}
        text={`from`}
        fill={"yellow"}
        fontSize={40}
      />
      <Circle position={endPos} fill={"yellow"} size={20} />
      <Txt
        position={() => endPos().addX(50)}
        text={`to`}
        fill={"yellow"}
        fontSize={40}
      />
    </Layout>
  );
  yield* all(
    label().opacity(1, 2),
    scaledDirection(direction.scale(len), 2),
    insertOrSelect(
      codeView,
      `\
  let to = from + dir * len\n`
    )
  );
  if (depth < 2) yield* beginSlide("drawLine " + depth);

  // Draw solid line
  const line = createRef<Line>();
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

  yield* all(
    line().end(1, 2),
    dirLine().opacity(0, 2),
    insertOrSelect(
      codeView,
      `\
    drawLine(from, to);\n`
    )
  );
  yield* label().opacity(0, 1);
  if (depth < 2) yield* beginSlide("rotate " + depth);

  // Draw dotted line
  const dottedDirection = Vector2.createSignal(direction);
  const dottedStartPos = endPos();
  const dottedEndPos = Vector2.createSignal(() => {
    return dottedStartPos.add(dottedDirection().scale(UNIT));
  });

  const rightDirLayout = createRef<Layout>();
  const rightDirLine = createRef<Line>();
  const rightDirTxt = createRef<Txt>();
  drawView.add(
    <Layout ref={rightDirLayout}>
      <Line
        ref={rightDirLine}
        points={[dottedStartPos, dottedEndPos]}
        stroke={"white"}
        lineWidth={8}
        radius={40}
        end={0}
        opacity={0.5}
      />
      <Txt
        ref={rightDirTxt}
        text={"rightDir"}
        fill={"yellow"}
        opacity={0.5}
        position={() =>
          dottedEndPos()
            .sub(dottedStartPos)
            .mul(rightDirLine().end())
            .mul(0.5)
            .add(dottedStartPos)
            .addX(60)
        }
      />
    </Layout>
  );
  yield* all(rightDirLine().end(1, 2), rightDirTxt().opacity(1, 2));
  yield* all(
    dottedDirection(dottedDirection().rotate(30), 2),
    insertOrSelect(
      codeView,
      `\
    
    let rightDir = rotate(dir, 30);
    let nextLen = len * 0.75;\n`
    )
  );
  if (depth < 2) yield* beginSlide("drawFractal " + depth);

  yield* rightDirTxt().opacity(0, 1);

  yield* insertOrSelect(
    codeView,
    `\
    drawFractal(to, rightDir, nextLen);\n`
  );

  if (depth < 2) yield* beginSlide("recurse " + depth);

  // // recurse to the right
  const nextLen = len * 0.75;
  const nextDirection = direction.rotate(30);
  yield* explainFractal(
    drawView,
    codeView,
    endPos(),
    nextDirection,
    nextLen,
    depth + 1
  );

  // yield* waitUntil("Third Slide");
}

export function* explanation(view: View2D) {
  const { topContent, bottomContent } = initTwoSimilarLayout(view);

  const len = 300;
  const startPos = new Vector2(0, topContent().height() / 2);
  const direction = new Vector2(0, -1);

  const code = createRef<Code>();
  // const code = Code.createSignal(CODE``);
  bottomContent().add(
    <Code
      ref={code}
      fontSize={40}
      code={CODE`
  `}
    />
  );

  yield* explainFractal(topContent(), code, startPos, direction, len, 0);
}
