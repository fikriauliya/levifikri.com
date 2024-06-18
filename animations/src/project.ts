import { makeProject } from "@motion-canvas/core";

import fractal from "./scenes/fractal-tree/index?scene";
import intro from "./scenes/fractal-tree/intro?scene";
import explanation from "./scenes/fractal-tree/explanation?scene";
import outro from "./scenes/fractal-tree/outro?scene";

export default makeProject({
  scenes: [intro, explanation, outro],
});
