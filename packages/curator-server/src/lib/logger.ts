import pino from "pino";
import "pino-loki";
import "pino-pretty";
import env from "./dotenv";

const transportTargets: pino.TransportTargetOptions[] = [
	// {
	// 	target: "pino-loki",
	// 	options: { host: "http://loki:3100" },
	// },
];

if (env.NODE_ENV !== "production") {
	transportTargets.push({
		target: "pino-pretty",
		options: { colorize: true },
		level: "debug",
	});
}

export const logger = pino(
	{},
	pino.transport({
		targets: transportTargets,
	}),
);
