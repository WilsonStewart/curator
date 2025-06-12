import { customAlphabet } from "nanoid";
import { ulid } from "ulid";

export function genNanoid(): string {
  const nanoid = customAlphabet(
    "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz",
    8
  );

  return nanoid();
}

export function genUlid(): string { return ulid() }