import { customAlphabet } from "nanoid";

export function genNanoid(): string {
  const nanoid = customAlphabet(
    "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz",
    8
  );

  return nanoid();
}
