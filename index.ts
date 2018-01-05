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

  public getFirstOrderKeys(): K1[] {
    return Array.from(this.data.keys());
  }

  public getSecondOrderKeys(): K2[] {
    const keys = new Set<K2>();

    // Requires `downlevelIteration` compiler option to be enabled
    // https://github.com/Microsoft/TypeScript/issues/11209
    for (const k2map of this.data.values()) {
      for (const key of k2map.keys()) {
        keys.add(key);
      }
    }

    return Array.from(keys);
  }
}

export default TwoDimensionalMap;
