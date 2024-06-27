import {
  NodeProps,
  Node,
  initial,
  Layout,
  Rect,
  signal,
} from "@motion-canvas/2d";
import {
  PossibleColor,
  SignalValue,
  SimpleSignal,
  createRef,
  makeRef,
} from "@motion-canvas/core";
import { ComplexRect } from "./complexRect";

export interface Grid2DProps extends NodeProps {
  cellSize?: SignalValue<number>;
  colCount: SignalValue<number>;
  rowCount: SignalValue<number>;
  cellColor?: SignalValue<PossibleColor>;
}

export class Grid2D extends Node {
  @initial(10)
  @signal()
  public declare readonly cellSize: SimpleSignal<number, this>;

  @signal()
  public declare readonly colCount: SimpleSignal<number, this>;

  @signal()
  public declare readonly rowCount: SimpleSignal<number, this>;

  public readonly cells: Rect[][] = [];

  public constructor(props?: Grid2DProps) {
    super({ ...props });

    // const grid = <Layout layout={true} direction={"column"} />;

    const midColPoint = this.colCount() * this.cellSize() * 0.5;
    const midRowPoint = this.rowCount() * this.cellSize() * 0.5;

    const surroundingBox = createRef<Rect>();
    this.add(
      <Rect
        ref={surroundingBox}
        width={this.colCount() * this.cellSize()}
        height={this.rowCount() * this.cellSize()}
        stroke={"white"}
        lineWidth={2}
      />
    );

    for (let i = 0; i < this.rowCount(); i++) {
      const rows: Rect[] = [];
      // const innerLayout = createRef<Layout>();
      // grid.add(<Layout ref={innerLayout} layout={true} direction={"row"} />);

      for (let j = 0; j < this.colCount(); j++) {
        const x = j * this.cellSize() - midColPoint;
        const y = i * this.cellSize() - midRowPoint;

        surroundingBox().add(
          <ComplexRect
            cellSize={this.cellSize}
            borders={[0, 0, 0, 0]}
            ref={makeRef(rows, j)}
            stroke={"white"}
            position={[x, y]}
            // layout={true}
          />
          // <Rect
          //   width={this.cellSize}
          //   height={this.cellSize}
          //   stroke={"white"}
          //   lineWidth={2}
          //   ref={makeRef(rows, j)}
          // />
        );
      }
      this.cells.push(rows);
    }

    // this.add(grid);
  }
}
