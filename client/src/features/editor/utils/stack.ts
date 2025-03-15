export class CirCulerStack<T> {
  private stack: (T | undefined)[];
  private maxSize: number = 24;
  private top: number = -1;
  private undoIndex: number = -1;

  constructor(maxSize?: number) {
    this.maxSize = maxSize || this.maxSize;
    this.stack = new Array(maxSize);
  }

  push(item: T): void {
    this.top = (this.top + 1) % this.maxSize;
    this.stack[this.top] = item;
    this.undoIndex = this.top;
    console.log("push called");
  }

  undo(): T | null {
    console.log("undo called");
    if (this.undoIndex < 0) return null;

    const prevIndex = this.undoIndex === 0 ? this.maxSize - 1 : this.undoIndex - 1;
    const prevItem = this.stack[prevIndex];
    if (!prevItem) return null;

    this.undoIndex = prevIndex;
    console.log("Undo called", prevItem);
    return prevItem;
  }

  redo(): T | null {
    console.log("redo called");
    if (this.undoIndex === this.top) return null;

    const nextIndex = (this.undoIndex + 1) % this.maxSize;
    const nextItem = this.stack[nextIndex];
    if (!nextItem) return null;

    this.undoIndex = nextIndex;
    console.log("Redo called", nextItem);
    return nextItem;
  }

  clear(): void {
    console.log("clear called");
    this.stack.fill(undefined);
    this.top = -1;
    this.undoIndex = -1;
  }

  get size(): number {
    console.log("size called");
    return this.top + 1;
  }

  get isEmpty(): boolean {
    console.log("isEmpty called");
    return this.top === -1;
  }

  get isFull(): boolean {
    console.log("isFull called");
    return this.top === this.maxSize - 1;
  }

  getCurrentState(): T | null {
    console.log("getCurrentState called");
    if (this.top < 0) return null;
    return this.stack[this.top] !== undefined ? (this.stack[this.top] ?? null) : null;
  }
}
