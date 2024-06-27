import {
  NodeProps,
  signal,
  Node,
  Line,
  initial,
  colorSignal,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  PossibleVector2,
  SignalValue,
  SimpleSignal,
} from "@motion-canvas/core";

export interface ComplexRectProps extends NodeProps {
  cellSize: SignalValue<number>;
  borders: SignalValue<[number, number, number, number]>;
  stroke?: SignalValue<PossibleColor>;
}

export class ComplexRect extends Node {
  @signal()
  public declare readonly cellSize: SimpleSignal<number, this>;

  @signal()
  public declare readonly borders: SimpleSignal<
    [number, number, number, number],
    this
  >;

  @initial("white")
  @colorSignal()
  public declare readonly stroke: ColorSignal<this>;

  public constructor(props?: ComplexRectProps) {
    super({ ...props });

    const [top, right, bottom, left] = this.borders();
    let points: PossibleVector2[][] = [];
    let lineWidths: number[] = [];
    if (top > 0) {
      points.push([
        [0, 0],
        [this.cellSize(), 0],
      ]);
      lineWidths.push(top);
    }
    if (right > 0) {
      points.push([
        [this.cellSize(), 0],
        [this.cellSize(), this.cellSize()],
      ]);
      lineWidths.push(right);
    }
    if (bottom > 0) {
      points.push([
        [this.cellSize(), this.cellSize()],
        [0, this.cellSize()],
      ]);
      lineWidths.push(bottom);
    }
    if (left > 0) {
      points.push([
        [0, this.cellSize()],
        [0, 0],
      ]);
      lineWidths.push(left);
    }
    // const layout = createRef<Layout>();
    // this.add(<Layout ref={layout} layout={false} />);

    for (let i = 0; i < points.length; i++) {
      this.add(
        <Line
          points={points[i]}
          stroke={this.stroke}
          lineWidth={lineWidths[i]}
        />
      );
    }
  }
}
