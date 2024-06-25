import { makeProject } from "@motion-canvas/core";

import maze from "./scenes/maze/index?scene";
// import audio from "../audio/fractal-tree/audio.mp3";

export default makeProject({
  scenes: [maze],
  // audio: audio,
});
