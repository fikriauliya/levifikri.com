import {
  Code,
  CodePoint,
  CodeSignal,
  Layout,
  Rect,
  Txt,
  View2D,
} from "@motion-canvas/2d";
import {
  ThreadGenerator,
  loop,
  usePlayback,
  PlaybackState,
  waitUntil,
  beginSlide,
  cancel,
  Reference,
  createRef,
  Vector2,
  useLogger,
  all,
  DEFAULT,
} from "@motion-canvas/core";

export function* loopUntilSlide(
  name: string,
  slideLoop: () => ThreadGenerator
): ThreadGenerator {
  const loopTask = yield loop(Infinity, slideLoop);

  if (usePlayback().state != PlaybackState.Presenting) {
    yield* waitUntil(name);
  }
  yield* beginSlide(name);

  cancel(loopTask);
}

type TwoLayout = {
  title: Reference<Txt>;
  content: Reference<Layout>;
};

const paddingTop = 200;
const paddingBottom = 350;

export function initTwoLayout(view: View2D): TwoLayout {
  view.removeChildren();
  const title = createRef<Txt>();
  const content = createRef<Layout>();
  view.add(
    <Layout
      layout
      direction={"column"}
      alignItems={"stretch"}
      size={["100%", "100%"]}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      <Layout layout marginBottom={100} justifyContent={"center"}>
        <Txt
          layout
          justifyContent={"center"}
          ref={title}
          fontSize={80}
          fontFamily="Futura"
          fill={"white"}
        />
      </Layout>
      <Layout layout grow={1}>
        {/* TODO: the height is still hardcoded */}
        <Layout height={1200} width={"100%"} ref={content} layout={false} />
      </Layout>
    </Layout>
  );

  return { title, content };
}

type TwoSimilarLayout = {
  topContent: Reference<Layout>;
  bottomContent: Reference<Layout>;
};
export function initTwoSimilarLayout(view: View2D): TwoSimilarLayout {
  view.removeChildren();
  const topContent = createRef<Layout>();
  const bottomContent = createRef<Layout>();

  view.add(
    <Layout
      layout
      direction={"column"}
      alignItems={"stretch"}
      size={["100%", "100%"]}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      <Layout grow={1} layout justifyContent={"center"}>
        {/* TODO: the height is still hardcoded 🏳️ */}
        <Layout height={700} width={"100%"} ref={topContent} layout={false} />
      </Layout>
      <Layout layout grow={1}>
        {/* TODO: the height is still hardcoded 🏳️ */}
        <Layout
          height={700}
          width={"100%"}
          ref={bottomContent}
          layout={false}
        />
      </Layout>
    </Layout>
  );

  return { topContent, bottomContent };
}

export function insertOrSelect(
  codeView: Reference<Code>,
  code: string,
  time: number
): ThreadGenerator;

export function insertOrSelect(
  codeView: Reference<Code>,
  code: string,
  time: number,
  codePoint: CodePoint
): ThreadGenerator;

// function isCodePoint(value: unknown): value is CodePoint {
//   return (
//     Array.isArray(value) &&
//     value.length === 2 &&
//     typeof value[0] === 'number' &&
//     typeof value[1] === 'number'
//   );
// }

export function* insertOrSelect(
  codeView: Reference<Code>,
  code: string,
  time: number,
  codePoint?: CodePoint
): ThreadGenerator {
  const regex = new RegExp(escapeRegExp(code), "gim");
  const ranges = codeView().findAllRanges(regex);
  if (ranges.length > 0) {
    yield* codeView().selection(ranges, time);
  } else {
    if (codePoint) {
      yield* all(
        codeView().selection(DEFAULT, 0),
        codeView().code.insert(codePoint, code, time)
      );
    } else {
      yield* all(
        codeView().selection(DEFAULT, 0),
        codeView().code.append(code, time)
        // codeView().selection(ranges, time)
      );
    }
  }
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
}

type ExplanationSetting = {
  [key: string]: {
    quota: number;
    slowTime: number;
    fastTime: number;
    naration: string;
    slideCreated?: boolean;
    noWait?: boolean;
    previousWaitEvent?: string;
  };
};

export type ExplanationFunction = (
  title: string,
  fn: (time: number) => ThreadGenerator
) => ThreadGenerator;

export function initExplain(setting: ExplanationSetting): ExplanationFunction {
  return function* (title, fn) {
    let { quota, fastTime, naration, slowTime, noWait, previousWaitEvent } =
      setting[title];
    // console.log(title, setting[title]);
    if (quota <= 0) {
      yield* fn(fastTime);
    } else {
      // console.log("Enough quota");
      setting[title].quota -= 1;
      // console.log(naration);

      const isSlideCreated = "slideCreated" in setting[title];
      if (!isSlideCreated) {
        if (previousWaitEvent) {
          yield* waitUntil(previousWaitEvent);
        }
        yield* beginSlide(title);
      }
      yield* fn(slowTime);
      if (!isSlideCreated && !noWait) {
        // if (usePlayback().state != PlaybackState.Presenting) {
        yield* waitUntil(title);
        // }
      }
      setting[title].slideCreated = true;
    }
  };
}
