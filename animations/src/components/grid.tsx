import {
  NodeProps,
  Node,
  initial,
  Layout,
  Rect,
  signal,
} from "@motion-canvas/2d";
import {
  SignalValue,
  SimpleSignal,
  createRef,
  makeRef,
} from "@motion-canvas/core";

export interface Grid2DProps extends NodeProps {
  cellSize?: SignalValue<number>;
  colCount: SignalValue<number>;
  rowCount: SignalValue<number>;
}

export class Grid2D extends Node {
  @initial(10)
  @signal()
  public declare readonly cellSize: SimpleSignal<number>;

  @signal()
  public declare readonly colCount: SimpleSignal<number>;

  @signal()
  public declare readonly rowCount: SimpleSignal<number>;

  private cells: Rect[][] = [];

  public constructor(props?: Grid2DProps) {
    super({ ...props });

    const grid = <Layout layout={true} direction={"column"} />;

    for (let i = 0; i < this.rowCount(); i++) {
      const rows: Rect[] = [];
      const innerLayout = createRef<Layout>();
      grid.add(<Layout ref={innerLayout} layout={true} />);

      for (let j = 0; j < this.colCount(); j++) {
        innerLayout().add(
          <Rect
            width={this.cellSize}
            height={this.cellSize}
            stroke={"white"}
            lineWidth={2}
            lineCap={"round"}
            ref={makeRef(rows, j)}
          />
        );
      }
      this.cells.push(rows);
    }

    this.add(grid);
  }
}
