import { v7 as uuidv7 } from "uuid";
import { customAlphabet } from "nanoid";

export function genUuid(): string {
  return uuidv7();
}

export function genNanoid(): string {
  const nanoid = customAlphabet(
    "123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz",
    10
  );

  return nanoid();
}
