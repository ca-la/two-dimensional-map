# two-dimensional-map

Kind of like a
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map),
but 2D.

## Usage

See `spec.ts` for full feature set. More documentation coming soon. Methods are
designed to conform as closely as reasonable to a 1-dimensional Map.

Two dimensional maps are Iterable — meaning you can loop over them with a
`for...of` loop:

```typescript
const map = new TwoDimensionalMap<string, string, string>();

map.set('x=1', 'y=1', 'battleship 1');
map.set('x=1', 'y=2', 'battleship 2');
map.set('x=2', 'y=1', 'battleship 3');

for (const [key1, key2, value] of map) {
  // Use the values somehow
}
```

## TODO

- Add boilerplate, publish to npm, etc
- It would be nice to support an arbitrary number of dimensions (3+). This is
  probably not feasible in TypeScript, so we probably won't.

## License

MIT
