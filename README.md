# CLI Workout Tracker

A TypeScript learning project built through deliberate practice — using AI as a guide and reviewer rather than a code generator (apart from this README...), to build real understanding and independence.

Commands: `a` add, `l` list, `d` delete, `u` update, `q` quit.

## Project structure

```
src/
  types.ts          # Workout interface
  workoutService.ts # State and all CRUD logic
  cmd.ts            # CLI interaction via readline
  index.ts          # Entry point
```

## Concepts covered

**TypeScript**

- Interfaces and strong typing
- `Partial<T>` — for optional update fields
- `Omit<T, K>` — to exclude `id` from add/update inputs, keeping the type accurate per use case
- Utility types as a way to derive types rather than duplicating them

**Array manipulation**

- `push` — adding items
- `findIndex` — locating items by a condition
- `splice` — removing items by index
- `forEach` — iterating with index for numbered display

**Function design**

- Single responsibility — each function does one thing
- Separating `ById` and `ByNumber` variants to keep concerns clean
- Guard clauses (early returns) to handle failure cases before the happy path

**State management**

- In-memory array as the source of truth
- All mutations go through service functions — nothing touches the array directly from outside

**Async / callbacks**

- Node.js `readline` for interactive CLI input
- Nested `rl.question` calls to collect multiple inputs sequentially
- Understanding why you can't assign a callback result to a variable

**ID generation**

- `crypto.randomUUID()` for stable, unique ids
- Why `array.length + 1` breaks after deletions
- Mapping user-facing numbers to internal UUIDs behind the scenes
