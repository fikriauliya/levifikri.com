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

export interface Grid2DProps extends NodeProps {
  cellSize?: SignalValue<number>;
  colCount: SignalValue<number>;
  rowCount: SignalValue<number>;
  cellColor?: SignalValue<PossibleColor>;
}

const LINE_WIDTH = 4;
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

  public *blockColBoundary(row: number, col: number, time: number) {
    yield* this.colBoundaries[row][col].lineWidth(LINE_WIDTH, time);
  }

  public *unblockColBoundary(row: number, col: number, time: number) {
    yield* this.selectColBoundary(row, col, "yellow", time);
    yield* this.colBoundaries[row][col].lineWidth(0, time);
  }

  public *selectColBoundary(
    row: number,
    col: number,
    color: PossibleColor,
    time: number
  ) {
    yield* this.colBoundaries[row][col].stroke(color, time);
  }

  public *blockRowBoundary(row: number, col: number, time: number) {
    yield* this.rowBoundaries[row][col].lineWidth(LINE_WIDTH, time);
  }

  public *unblockRowBoundary(row: number, col: number, time: number) {
    yield* this.selectRowBoundary(row, col, "yellow", time);
    yield* this.rowBoundaries[row][col].lineWidth(0, time);
  }

  public *selectRowBoundary(
    row: number,
    col: number,
    color: PossibleColor,
    time: number
  ) {
    yield* this.rowBoundaries[row][col].stroke(color, time);
  }

  public *arrow(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) {
    const halfCellSize = this.cellSize() * 0.5;

    const startingColPoint = -(this.colCount() * this.cellSize() * 0.5);
    const startingRowPoint = -(this.rowCount() * this.cellSize() * 0.5);

    const x1 = fromCol * this.cellSize() + startingColPoint + halfCellSize;
    const y1 = fromRow * this.cellSize() + startingRowPoint + halfCellSize;
    const x2 = toCol * this.cellSize() + startingColPoint + halfCellSize;
    const y2 = toRow * this.cellSize() + startingRowPoint + halfCellSize;

    const arrow = createRef<Line>();
    this.add(
      <Line
        ref={arrow}
        points={[
          [x1, y1],
          [x2, y2],
        ]}
        stroke={"magenta"}
        lineWidth={LINE_WIDTH}
        // endArrow
      />
    );

    yield* arrow().end(1, 1);
  }
  public *selectCell(
    row: number,
    col: number,
    color: PossibleColor,
    time: number
  ) {
    // draw rectangle

    const startingColPoint = -(this.colCount() * this.cellSize() * 0.5);
    const startingRowPoint = -(this.rowCount() * this.cellSize() * 0.5);

    const x1 = col * this.cellSize() + startingColPoint + this.cellSize() * 0.5;
    const y1 = row * this.cellSize() + startingRowPoint + this.cellSize() * 0.5;

    const rect = createRef<Rect>();
    this.add(
      <Rect
        ref={rect}
        x={x1}
        y={y1}
        width={this.cellSize()}
        height={this.cellSize()}
        opacity={0}
        stroke={"white"}
        fill={"yellow"}
        lineWidth={LINE_WIDTH}
      />
    );

    yield* rect().opacity(1, time);
  }
}
