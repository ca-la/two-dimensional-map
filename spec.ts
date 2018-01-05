import TwoDimensionalMap from './index';

describe('TwoDimensionalMap', () => {
  test('stores and retrieves data', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    map.set('x=1', 'y=1', 'my battleship');
    expect(map.get('x=1', 'y=1')).toBe('my battleship');
  });

  test('retrieves nothing when nothing is set', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    expect(map.get('x=1', 'y=1')).toBeUndefined();
    expect(map.get('x=1', 'y=2')).toBeUndefined();
    expect(map.get('y=1', 'x=1')).toBeUndefined();
  });

  test('does not retrieve data from elsewhere', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    map.set('x=1', 'y=1', 'my battleship');
    expect(map.get('x=2', 'y=1')).toBeUndefined();
    expect(map.get('x=1', 'y=2')).toBeUndefined();
    expect(map.get('y=1', 'x=1')).toBeUndefined();
  });

  test('allows data to be overwritten safely', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    map.set('x=1', 'y=1', 'battleship 1');
    map.set('x=1', 'y=2', 'battleship 2');
    map.set('x=2', 'y=1', 'battleship 3');

    map.set('x=1', 'y=1', 'destroyed');

    expect(map.get('x=1', 'y=1')).toBe('destroyed');
    expect(map.get('x=1', 'y=2')).toBe('battleship 2');
    expect(map.get('x=2', 'y=1')).toBe('battleship 3');
  });

  test('allows data to be deleted safely', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    map.set('x=1', 'y=1', 'battleship 1');
    map.set('x=1', 'y=2', 'battleship 2');
    map.set('x=2', 'y=1', 'battleship 3');

    map.delete('x=1', 'y=1');

    expect(map.get('x=1', 'y=1')).toBeUndefined();
    expect(map.get('x=1', 'y=2')).toBe('battleship 2');
    expect(map.get('x=2', 'y=1')).toBe('battleship 3');
  });

  test('supports interesting types of keys and values', () => {
    const map = new TwoDimensionalMap<() => void, boolean, symbol>();

    const key1 = (): number => 1;
    const key2 = false;
    const value1 = Symbol();
    const value2 = Symbol();

    map.set(key1, key2, value1);
    expect(map.get(key1, key2)).toBe(value1);

    map.set(key1, key2, value2);
    expect(map.get(key1, key2)).toBe(value2);
  });

  test('.getFirstOrderKeys returns the set of `key1`s', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    map.set('x=1', 'y=1', 'battleship 1');
    map.set('x=1', 'y=2', 'battleship 2');
    map.set('x=2', 'y=1', 'battleship 3');

    expect(map.getFirstOrderKeys()).toEqual(['x=1', 'x=2']);
  });

  test('.getSecondOrderKeys returns the set of `key2`s', () => {
    const map = new TwoDimensionalMap<string, string, string>();

    map.set('x=1', 'y=1', 'battleship 1');
    map.set('x=1', 'y=2', 'battleship 2');
    map.set('x=2', 'y=1', 'battleship 3');

    expect(map.getSecondOrderKeys()).toEqual(['y=1', 'y=2']);
  });
});
