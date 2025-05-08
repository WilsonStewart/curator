import { Hono } from "hono";

export const exhibit = new Hono().get('/', (c) => {
  return c.json({
    "name": "bob"
  })
})
