import { makeScene2D } from "@motion-canvas/2d";
import { intro } from "./intro";
import { explanation } from "./explanation";

export default makeScene2D(function* (view) {
  yield* intro(view);
  yield* explanation(view);
});
