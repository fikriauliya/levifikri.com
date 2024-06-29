import {
  NodeProps,
  Node,
  initial,
  Layout,
  Rect,
  signal,
  Line,
} from "@motion-canvas/2d";
import {
  PossibleColor,
  Signal,
  SignalValue,
  SimpleSignal,
  createRef,
  createSignal,
  makeRef,
} from "@motion-canvas/core";
import { ComplexRect } from "./complexRect";

export interface Grid2DProps extends NodeProps {
  cellSize?: SignalValue<number>;
  colCount: SignalValue<number>;
  rowCount: SignalValue<number>;
  cellColor?: SignalValue<PossibleColor>;
}

const LINE_WIDTH = 3;
export class Grid2D extends Node {
  @initial(10)
  @signal()
  public declare readonly cellSize: SimpleSignal<number, this>;

  @signal()
  public declare readonly colCount: SimpleSignal<number, this>;

  @signal()
  public declare readonly rowCount: SimpleSignal<number, this>;

  private readonly colBoundaries: Line[][] = [];

  private readonly rowBoundaries: Line[][] = [];

  public constructor(props?: Grid2DProps) {
    super({ ...props });

    const startingColPoint = -(this.colCount() * this.cellSize() * 0.5);
    const startingRowPoint = -(this.rowCount() * this.cellSize() * 0.5);

    // draw
    for (let i = 0; i < this.rowCount() + 1; i++) {
      const rowLines = [];
      const colLines = [];

      for (let j = 0; j < this.colCount() + 1; j++) {
        const x = j * this.cellSize() + startingColPoint;
        const y = i * this.cellSize() + startingRowPoint;

        // draw vertical line to the left, the center line is midColPoint
        const colLine = createRef<Line>();
        this.add(
          <Line
            ref={colLine}
            points={[
              [x, y],
              [x, y + this.cellSize()],
            ]}
            stroke={"white"}
            lineWidth={0}
          />
        );
        // draw horizontal line to the top
        const rowLine = createRef<Line>();
        this.add(
          <Line
            ref={rowLine}
            points={[
              [x, y],
              [x + this.cellSize(), y],
            ]}
            stroke={"white"}
            lineWidth={0}
          />
        );

        colLines.push(colLine());
        rowLines.push(rowLine());
      }

      this.colBoundaries.push(colLines);
      this.rowBoundaries.push(rowLines);
    }
  }

  public blockAllBoundaries() {
    for (let i = 0; i < this.rowCount() + 1; i++) {
      for (let j = 0; j < this.colCount() + 1; j++) {
        const colLineWidth = !(i == this.rowCount()) ? LINE_WIDTH : 0;
        const rowLineWidth = !(j == this.colCount()) ? LINE_WIDTH : 0;

        this.colBoundaries[i][j].lineWidth(colLineWidth);
        this.rowBoundaries[i][j].lineWidth(rowLineWidth);
      }
    }
  }

  public blockCol(row: number, col: number) {
    this.colBoundaries[row][col].lineWidth(LINE_WIDTH);
  }

  public unblockCol(row: number, col: number) {
    this.colBoundaries[row][col].lineWidth(0);
  }

  public blockRow(row: number, col: number) {
    this.rowBoundaries[row][col].lineWidth(LINE_WIDTH);
  }

  public unblockRow(row: number, col: number) {
    this.rowBoundaries[row][col].lineWidth(0);
  }
}
