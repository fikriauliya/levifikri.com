import { View2D, makeScene2D } from "@motion-canvas/2d";
import intro from "./intro";

export default makeScene2D(function* (view) {
  yield* intro(view);
});
