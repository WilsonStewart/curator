import { Hono } from "hono";
import type { User, Session } from "./auth";

export function createApp() {
	return new Hono<
		{},
		{
			user: User | null;
			session: Session | null;
		}
	>();
}
