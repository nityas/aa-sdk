import { bigintMapReviver } from "./reviver.js";

/**
 * JSON parses a string while correctly handling BigInt and Map types.
 * This method will take the string input, decodeURIComponent it, and then json parse it.
 * It handles BigInt and Map types by checking for the __type key and converting the value to the correct type.
 * Those types are generated by the `serialize` method exported alongside this one
 *
 * @param {string} value the string to deserialize
 * @returns {T} the parsed object
 */
export function deserialize<type>(value: string): type {
  return JSON.parse(decodeURIComponent(value), bigintMapReviver);
}
