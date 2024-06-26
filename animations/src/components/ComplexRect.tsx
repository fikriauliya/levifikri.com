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
  Signal,
  SignalValue,
  SimpleSignal,
  useLogger,
} from "@motion-canvas/core";

export interface ComplexRectProps extends NodeProps {
  size: SignalValue<number>;
  borders: SignalValue<[number, number, number, number]>;
  stroke?: SignalValue<PossibleColor>;
}

export class ComplexRect extends Node {
  @signal()
  public declare readonly size: SimpleSignal<number, this>;

  @signal()
  public declare readonly borders: SimpleSignal<
    [number, number, number, number],
    this
  >;

  @initial("white")
  @colorSignal()
  public declare readonly stroke: ColorSignal<this>;

  public constructor(props?: ComplexRectProps) {
    const logger = useLogger();
    super({ ...props });

    logger.info("Size: " + this.size());
    logger.info("Borders: " + this.borders());

    const [top, right, bottom, left] = this.borders();
    let points: PossibleVector2[][] = [];
    let lineWidths: number[] = [];
    if (top > 0) {
      points.push([
        [0, 0],
        [this.size(), 0],
      ]);
      lineWidths.push(top);
    }
    if (right > 0) {
      points.push([
        [this.size(), 0],
        [this.size(), this.size()],
      ]);
      lineWidths.push(right);
    }
    if (bottom > 0) {
      points.push([
        [this.size(), this.size()],
        [0, this.size()],
      ]);
      lineWidths.push(bottom);
    }
    if (left > 0) {
      points.push([
        [0, this.size()],
        [0, 0],
      ]);
      lineWidths.push(left);
    }
    // logger.info("Points: " + points.toString());
    for (let i = 0; i < points.length; i++) {
      logger.info("Points " + i + ": " + points[i].toString());
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
