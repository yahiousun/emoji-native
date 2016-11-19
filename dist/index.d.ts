/// <reference types="typescript" />

declare module 'emoji-recovery' {
  export namespace convert {
    export function fromCodePoint(input: string): string;
    export function toCodePoint(input: string): string;
  }
  export function parse(input: string): string;
  export let regex: RegExp;
}
