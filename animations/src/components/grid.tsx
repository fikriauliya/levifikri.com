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

export class Grid2D extends Node {
  @initial(10)
  @signal()
  public declare readonly cellSize: SimpleSignal<number, this>;

  @signal()
  public declare readonly colCount: SimpleSignal<number, this>;

  @signal()
  public declare readonly rowCount: SimpleSignal<number, this>;

  private readonly colBoundaries: SimpleSignal<boolean, this>[][] = [];

  private readonly rowBoundaries: SimpleSignal<boolean, this>[][] = [];

  public constructor(props?: Grid2DProps) {
    super({ ...props });

    const startingColPoint = -(this.colCount() * this.cellSize() * 0.5);
    const startingRowPoint = -(this.rowCount() * this.cellSize() * 0.5);

    // init
    for (let i = 0; i < this.rowCount() + 1; i++) {
      this.colBoundaries.push([]);
      this.rowBoundaries.push([]);

      for (let j = 0; j < this.colCount() + 1; j++) {
        this.colBoundaries[i].push(createSignal(false));
        this.rowBoundaries[i].push(createSignal(false));
      }
    }

    const LINE_WIDTH = 3;
    // draw
    for (let i = 0; i < this.rowCount() + 1; i++) {
      for (let j = 0; j < this.colCount() + 1; j++) {
        const x = j * this.cellSize() + startingColPoint;
        const y = i * this.cellSize() + startingRowPoint;

        const colLineWidth = () =>
          this.colBoundaries[i][j]() ? LINE_WIDTH : 0;
        const rowLineWidth = () =>
          this.rowBoundaries[i][j]() ? LINE_WIDTH : 0;

        // draw vertical line to the left, the center line is midColPoint
        // const line = createRef<Line>();
        this.add(
          <Line
            // ref={line}
            points={[
              [x, y],
              [x, y + this.cellSize()],
            ]}
            stroke={"white"}
            lineWidth={colLineWidth}
          />
        );
        // draw horizontal line to the top
        // const line = createRef<Line>();
        this.add(
          <Line
            // ref={line}
            points={[
              [x, y],
              [x + this.cellSize(), y],
            ]}
            stroke={"white"}
            lineWidth={rowLineWidth}
          />
        );
      }
    }
  }

  public blockAllBoundaries() {
    for (let i = 0; i < this.rowCount() + 1; i++) {
      for (let j = 0; j < this.colCount() + 1; j++) {
        const fillInCol = !(i == this.rowCount());
        const fillInRow = !(j == this.colCount());
        this.colBoundaries[i][j](fillInCol);
        this.rowBoundaries[i][j](fillInRow);
      }
    }
  }

  public blockCol(row: number, col: number) {
    this.colBoundaries[row][col](true);
  }

  public unblockCol(row: number, col: number) {
    this.colBoundaries[row][col](false);
  }

  public blockRow(row: number, col: number) {
    this.rowBoundaries[row][col](true);
  }

  public unblockRow(row: number, col: number) {
    this.rowBoundaries[row][col](false);
  }

  public selectCol(row: number, col: number) {
    this.colBoundaries[row][col](true);
  }
}
