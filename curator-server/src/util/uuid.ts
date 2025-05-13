import { v7 as uuidv7 } from "uuid";

export function genUuid(): string {
  return uuidv7();
}
