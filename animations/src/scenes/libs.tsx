import { Code, CodeSignal, Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
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

export function* insertOrSelect(
  codeView: Reference<Code>,
  code: string
): ThreadGenerator {
  const regex = new RegExp(escapeRegExp(code), "gim");
  const ranges = codeView().findAllRanges(regex);
  if (ranges.length > 0) {
    yield* codeView().selection(ranges, 2);
  } else {
    yield* codeView().code.append(code, 2);
    const ranges = codeView().findAllRanges(regex);
    yield* codeView().selection(ranges, 2);
  }
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
}
