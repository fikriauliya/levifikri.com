import {
  NodeProps,
  Node,
  initial,
  Rect,
  signal,
  Line,
  Circle,
} from "@motion-canvas/2d";
import {
  PossibleColor,
  Reference,
  SignalValue,
  SimpleSignal,
  createRef,
} from "@motion-canvas/core";

export interface Grid2DProps extends NodeProps {
  cellSize?: SignalValue<number>;
  colCount: SignalValue<number>;
  rowCount: SignalValue<number>;
  cellColor?: SignalValue<PossibleColor>;
}

export class Cell {
  constructor(public col: number, public row: number) {}

  toString(): string {
    return `(${this.col}, ${this.row})`;
  }

  equals(other: Cell): boolean {
    return this.col === other.col && this.row === other.row;
  }
}

type Coord = { x: number; y: number };
type Orientation = "row" | "col";
type Shape = "rectangle" | "circle";

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

  // hashmap of (x, y) -> cell
  private readonly selectedCells = new Map<string, Rect | Circle>();

  private readonly objectsCell = new Map<string, Rect | Circle>();

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

  public *blockBoundary(pos: Cell, orientation: Orientation, time: number) {
    yield* this.getBoundary(pos, orientation).lineWidth(LINE_WIDTH, time);
  }

  public *unblockBoundary(pos: Cell, orientation: Orientation, time: number) {
    yield* this.selectBoundary(pos, "yellow", orientation, time);
    yield* this.getBoundary(pos, orientation).lineWidth(0, time);
  }

  public *selectBoundary(
    pos: Cell,
    color: PossibleColor,
    orientation: Orientation,
    time: number
  ) {
    yield* this.getBoundary(pos, orientation).stroke(color, time);
  }

  private getBoundary(pos: Cell, orientation: Orientation): Line {
    if (orientation === "col") {
      return this.colBoundaries[pos.row][pos.col];
    } else {
      return this.rowBoundaries[pos.row][pos.col];
    }
  }

  public *arrow(from: Cell, to: Cell) {
    const { x: x1, y: y1 } = this.getCellPosition(from);
    const { x: x2, y: y2 } = this.getCellPosition(to);

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

    // TODO: change to time
    yield* arrow().end(1, 1);
  }
  public *selectCell(
    pos: Cell,
    color: PossibleColor,
    shape: Shape,
    time: number
  ) {
    if (this.selectedCells.has(pos.toString())) {
      yield* this.selectedCells.get(pos.toString())!.fill(color, time);
      return;
    }

    const { x, y } = this.getCellPosition(pos);
    const padding = LINE_WIDTH * 4;

    let node: Reference<Rect | Circle>;
    if (shape === "rectangle") {
      node = createRef<Rect>();
      this.add(
        <Rect
          ref={node}
          x={x}
          y={y}
          width={this.cellSize() - padding}
          height={this.cellSize() - padding}
          opacity={0}
          fill={color}
          lineWidth={LINE_WIDTH}
        />
      );
    } else {
      node = createRef<Circle>();
      this.add(
        <Circle
          ref={node}
          x={x}
          y={y}
          size={this.cellSize() - padding}
          opacity={0}
          fill={color}
          lineWidth={LINE_WIDTH}
        />
      );
    }
    this.selectedCells.set(pos.toString(), node());
    yield* node().opacity(1, time);
  }

  public *putCell(
    name: string,
    pos: Cell,
    color: PossibleColor,
    shape: Shape,
    time: number
  ) {
    if (this.objectsCell.has(name)) {
      const node = this.objectsCell.get(name)!;
      node.remove();
    }

    const { x, y } = this.getCellPosition(pos);
    const padding = LINE_WIDTH * 4;

    let node: Reference<Rect | Circle>;
    if (shape === "rectangle") {
      node = createRef<Rect>();
      this.add(
        <Rect
          ref={node}
          x={x}
          y={y}
          width={this.cellSize() - padding}
          height={this.cellSize() - padding}
          opacity={0}
          fill={color}
          lineWidth={LINE_WIDTH}
        />
      );
    } else {
      node = createRef<Circle>();
      this.add(
        <Circle
          ref={node}
          x={x}
          y={y}
          size={this.cellSize() - padding}
          opacity={0}
          fill={color}
          lineWidth={LINE_WIDTH}
        />
      );
    }
    this.objectsCell.set(name, node());
    yield* node().opacity(1, time);
  }

  public *deselectCell(pos: Cell, time: number) {
    if (!this.selectedCells.has(pos.toString())) {
      return;
    }

    const cell = this.selectedCells.get(pos.toString())!;
    yield* cell.opacity(0, time);

    cell.remove();
    this.selectedCells.delete(pos.toString());
  }

  private getCellPosition(pos: Cell): Coord {
    const startingColPoint = -(this.colCount() * this.cellSize() * 0.5);
    const startingRowPoint = -(this.rowCount() * this.cellSize() * 0.5);

    const x =
      pos.col * this.cellSize() + startingColPoint + this.cellSize() * 0.5;
    const y =
      pos.row * this.cellSize() + startingRowPoint + this.cellSize() * 0.5;

    return { x, y };
  }
}
