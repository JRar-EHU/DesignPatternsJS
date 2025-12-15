export default class Warehouse {
  private static instance: Warehouse;

  private data = new Map<string, Map<string, number>>();

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  set(shapeId: string, key: string, value: number) {
    if (!this.data.has(shapeId)) {
      this.data.set(shapeId, new Map());
    }
    this.data.get(shapeId)!.set(key, value);
  }

  get(shapeId: string, key: string): number | undefined {
    return this.data.get(shapeId)?.get(key);
  }

  getAll(shapeId: string): Map<string, number> | undefined {
    return this.data.get(shapeId);
  }

  remove(shapeId: string): void {
    this.data.delete(shapeId);
  }
}
