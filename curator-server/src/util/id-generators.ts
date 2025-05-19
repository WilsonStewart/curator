import { v7 as uuidv7 } from "uuid";
import { customAlphabet } from "nanoid";

export function genUuid(): string {
  return uuidv7();
}

export function genNanoid(): string {
  const nanoid = customAlphabet(
    "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz",
    8
  );

  return nanoid();
}
