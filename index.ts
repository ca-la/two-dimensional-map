type DataStore<K, V> = Map<K, Map<K, V>>;

class TwoDimensionalMap<K, V> {
  private data: DataStore<K, V>;

  constructor() {
    this.data = new Map<K, Map<K, V>>();
  }

  public get(key1: K, key2: K): V | undefined {
    const byKey1 = this.data.get(key1);
    if (byKey1 === undefined) { return undefined; }

    return byKey1.get(key2);
  }

  public set(key1: K, key2: K, value: V): void {
    const byKey1 = this.data.get(key1) || new Map<K, V>();
    byKey1.set(key2, value);
    this.data.set(key1, byKey1);
  }

  public delete(key1: K, key2: K): void {
    const byKey1 = this.data.get(key1) || new Map<K, V>();
    byKey1.delete(key2);
    this.data.set(key1, byKey1);
  }
}

export default TwoDimensionalMap;
