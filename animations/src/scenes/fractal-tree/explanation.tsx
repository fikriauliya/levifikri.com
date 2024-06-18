import {
  Layout,
  LezerHighlighter,
  Line,
  View2D,
  Code,
  CODE,
  Circle,
  Txt,
  Camera,
  lines,
} from "@motion-canvas/2d";
import {
  Reference,
  ThreadGenerator,
  Vector2,
  all,
  chain,
  createRef,
  sequence,
  useLogger,
  waitFor,
} from "@motion-canvas/core";
import {
  ExplanationFunction,
  initExplain,
  initTwoSimilarLayout,
  insertOrSelect,
} from "../libs";
import { parser } from "@lezer/python";

Code.defaultHighlighter = new LezerHighlighter(parser);

const UNIT = 150;
const MAX_DEPTH = 2;

function* explainFractal(
  drawView: Layout,
  explain: ExplanationFunction,
  codeView: Reference<Code>,
  startPos: Vector2,
  direction: Vector2,
  len: number,
  depth: number
): ThreadGenerator {
  const logger = useLogger();
  if (depth > MAX_DEPTH) {
    return;
  }
  const scaledDirection = Vector2.createSignal(direction.scale(UNIT));
  const endPos = Vector2.createSignal(() => startPos.add(scaledDirection()));
  const dirLine = createRef<Layout>();
  const label = createRef<Layout>();

  yield* explain("dir", function* (time) {
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
    drawView.add(
      <Layout opacity={0} ref={label}>
        <Circle position={startPos} fill={"yellow"} size={20} />
        <Txt
          position={startPos.addX(80)}
          text={`start`}
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
    yield* chain(
      all(
        insertOrSelect(
          codeView,
          `\
def drawFractal(start, dir, len):
  `,
          time
        ),
        dirLine().opacity(1, time / 2)
      ),
      waitFor(time),
      all(
        label().opacity(1, time / 2),
        scaledDirection(direction.scale(len), time),
        insertOrSelect(
          codeView,
          `\
  to = start + dir * len\n`,
          time
        )
      )
    );
  });

  yield* explain("drawLine", function* (time) {
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
      line().end(1, time),
      dirLine().opacity(0, time),
      insertOrSelect(
        codeView,
        `\
    drawLine(start, to);\n`,
        time
      )
    );
    yield* label().opacity(0, time / 2);
  });

  // Draw dotted line
  let explainRec = function* (degree: number, label: string, time: number) {
    if (depth + 1 > MAX_DEPTH) {
      yield* explain("baseCase", function* (time) {
        yield* insertOrSelect(
          codeView,
          `\
    if len < MIN_LENGTH:
      return\n\n`,
          time,
          [2, 0]
        );
      });
      return;
    }

    const dottedDirection = Vector2.createSignal(direction);
    const dottedStartPos = endPos();
    const dottedEndPos = Vector2.createSignal(() => {
      return dottedStartPos.add(dottedDirection().scale(UNIT));
    });

    const nextDirLayout = createRef<Layout>();
    const nextDirLine = createRef<Line>();
    const nextDirTxt = createRef<Txt>();
    drawView.add(
      <Layout ref={nextDirLayout}>
        <Line
          ref={nextDirLine}
          points={[dottedStartPos, dottedEndPos]}
          stroke={"white"}
          lineWidth={8}
          radius={40}
          end={0}
          opacity={0.5}
        />
        <Txt
          ref={nextDirTxt}
          text={"nextDir"}
          fill={"yellow"}
          opacity={0.5}
          position={() =>
            dottedEndPos()
              .sub(dottedStartPos)
              .mul(nextDirLine().end())
              .mul(0.5)
              .add(dottedStartPos)
              .addX(60)
          }
        />
      </Layout>
    );

    yield* all(nextDirLine().end(1, time), nextDirTxt().opacity(1, time));
    yield* all(
      dottedDirection(dottedDirection().rotate(degree), time),
      insertOrSelect(
        codeView,
        `\
    
    nextDir = rotate(dir, ${degree})\n`,
        time
      )
    );
    yield* nextDirTxt().opacity(0, time / 2);

    yield* explain("recurse " + degree, function* (time) {
      yield* insertOrSelect(
        codeView,
        `\
    # recurse to ${label}
    drawFractal(to, nextDir, len * 0.7)\n`,
        time
      );
      // // recurse to the right
      const nextLen = len * 0.75;
      const nextDirection = direction.rotate(degree);
      yield* explainFractal(
        drawView,
        explain,
        codeView,
        endPos(),
        nextDirection,
        nextLen,
        depth + 1
      );
    });
  };

  yield* explain("rotateRight", function* (time) {
    yield* explainRec(30, "right", time);
  });
  yield* explain("rotateLeft", function* (time) {
    yield* explainRec(-30, "left", time);
  });
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

  const explanationSetting = {
    dir: { quota: 1, slowTime: 4, fastTime: 0.5 },
    drawLine: { quota: 1, slowTime: 2, fastTime: 0.5 },
    rotateRight: { quota: 1, slowTime: 2, fastTime: 0.5 },
    rotateLeft: { quota: 2, slowTime: 2, fastTime: 0.5 },
    "drawFractal 30": { quota: 1, slowTime: 2, fastTime: 0.5 },
    "drawFractal -30": { quota: 1, slowTime: 2, fastTime: 0.5 },
    "recurse 30": { quota: 1, slowTime: 2, fastTime: 0.5 },
    "recurse -30": { quota: 1, slowTime: 2, fastTime: 0.5 },
    baseCase: { quota: 1, slowTime: 4, fastTime: 0.5 },
  };

  const explain = initExplain(explanationSetting);
  yield* explainFractal(
    topContent(),
    explain,
    code,
    startPos,
    direction,
    len,
    0
  );
}
