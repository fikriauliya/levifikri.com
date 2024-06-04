import { Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
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

const topMargin = 300;
const bottomMargin = 350;

export function initTwoLayout(view: View2D): TwoLayout {
  view.removeChildren();

  const titlePosition = new Vector2(0, -view.height() / 2 + topMargin);
  const title = createRef<Txt>();
  view.add(
    <Txt
      ref={title}
      fontSize={80}
      fontFamily="Futura"
      position={titlePosition}
      fill={"white"}
    />
  );
  const content = createRef<Layout>();
  view.add(
    <Layout
      ref={content}
      position={new Vector2(0, view.height() / 2 - bottomMargin)}
    />
  );

  return { title, content };
}

type ThreeLayout = {
  title: Reference<Txt>;
  content: Reference<Layout>;
};
export function initThreeLayout(view: View2D): ThreeLayout {
  return {
    title: createRef<Txt>(),
    content: createRef<Layout>(),
  };
}
