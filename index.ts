type DataStore<K1, K2, V> = Map<K1, Map<K2, V>>;

class TwoDimensionalMap<K1, K2, V> {
  private data: DataStore<K1, K2, V>;

  constructor() {
    this.data = new Map<K1, Map<K2, V>>();
  }

  public get(key1: K1, key2: K2): V | undefined {
    const byKey1 = this.data.get(key1);
    if (byKey1 === undefined) { return undefined; }

    return byKey1.get(key2);
  }

  public set(key1: K1, key2: K2, value: V): void {
    const byKey1 = this.data.get(key1) || new Map<K2, V>();
    byKey1.set(key2, value);
    this.data.set(key1, byKey1);
  }

  public delete(key1: K1, key2: K2): void {
    const byKey1 = this.data.get(key1) || new Map<K2, V>();
    byKey1.delete(key2);
    this.data.set(key1, byKey1);
  }
}

export default TwoDimensionalMap;
