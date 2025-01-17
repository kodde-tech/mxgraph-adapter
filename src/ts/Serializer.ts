import {mxCell, mxGeometry, mxGraphModel, mxPoint} from "mxgraph";
import {ICellData, IGeometry, IModelData, IPoint, IStyleData} from "./MxGraphData";

export class Serializer {

  public static serializeMxGraphModel(model: mxGraphModel): IModelData {
    const cells: { [key: string]: any } = {};

    Object.keys(model.cells).forEach((cellId: string) => {
      const cell = model.cells[cellId];
      cells[cellId] = Serializer.serializeMxCell(cell);
    });

    const root = model.root.id;

    return {
      root,
      cells
    };
  }

  public static serializeMxCell(cell: mxCell): ICellData {
    const result: ICellData = {
      id: cell.id
    };

    if (cell.style !== undefined) {
      result.style = Serializer.serializeStyle(cell.style);
    }

    if (cell.value !== undefined) {
      result.value = Serializer.serializeValue(cell.value);
    }

    if (cell.geometry !== undefined) {
      result.geometry = Serializer.serializeGeometry(cell.geometry);
    }

    if (cell.connectable !== undefined) {
      result.connectable = cell.connectable;
    }

    if (cell.visible !== undefined) {
      result.visible = cell.visible;
    }

    if (cell.collapsed !== undefined) {
      result.collapsed = cell.collapsed;
    }

    if (cell.edge) {
      result.edge = true;
    }

    if (cell.vertex) {
      result.vertex = true;
    }

    if (cell.parent) {
      result.parent = cell.parent.id;
    }

    if (cell.source) {
      result.source = cell.source.id;
    }

    if (cell.target) {
      result.target = cell.target.id;
    }

    // Custom
    if (cell.moduleName) {
      result.moduleName = cell.moduleName
    }

    if (cell.class) {
        result.class = cell.class
    }

    if (cell.type) {
        result.type = cell.type
    }

    if (cell.variantQuantity) {
        result.variantQuantity = cell.variantQuantity
    }

    if (cell.hasVariant) {
        result.hasVariant = cell.hasVariant
    }

    if (cell.mapperEvents) {
        result.mapperEvents = cell.mapperEvents
    }

    if (cell.flowType) {
      result.flowType = cell.flowType;
    }

    return result;
  }

  public static serializeGeometry(geometry: mxGeometry): IGeometry {
    const result: IGeometry = {
      x: geometry.x,
      y: geometry.y,
      width: geometry.width,
      height: geometry.height
    };

    if (geometry.points) {
      result.points = geometry.points.map((p: mxPoint) => Serializer.serializeMxPoint(p));
    }

    if (geometry.sourcePoint) {
      result.sourcePoint = Serializer.serializeMxPoint(geometry.sourcePoint);
    }

    if (geometry.targetPoint) {
      result.targetPoint = Serializer.serializeMxPoint(geometry.targetPoint);
    }

    if (geometry.relative !== undefined) {
      result.relative = geometry.relative;
    }

    if (geometry.offset) {
      result.offset = Serializer.serializeMxPoint(geometry.offset);
    }

    return result;
  }

  public static serializeMxPoint(geometry: mxPoint): IPoint {
    return {
      x: geometry.x,
      y: geometry.y
    };
  }

  public static serializeStyle(style: string): IStyleData {
    const result: IStyleData = {
      classes: [],
      styles: {}
    };

    if (style) {
      const styles = style.split(";");
      styles.forEach((s) => {
        if (s.includes("=")) {
          const [key, value] = s.split("=");
          result.styles[key] = value;
        } else if (s.trim().length > 0) {
          result.classes.push(s);
        }
      });
    }

    return result;
  }

  public static serializeValue(value: any): any {
    // TODO handle an xml node.
    return value;
  }
}
