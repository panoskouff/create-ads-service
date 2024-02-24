/**
 * Combine two types. If a key is in both types, the one from
 * the second type is used.
 *
 *
 * @example
 *   Merge<SomeModel, { extra: 'keys' }>
 */
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

/**
 * // Usage
 * let div: ElementType<'div'>; // Type is HTMLDivElement
 * let img: ElementType<'img'>; // Type is HTMLImageElement
 */
type ElementType<T extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[T];
