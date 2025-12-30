// import { describeRoute } from "hono-openapi";
// import { resolver } from "hono-openapi";
// import type { Hono } from "hono";
// import { LCalculateUnauthenticatedStatus } from "@/logic/status/L.status.calculate-status";
// import { logger } from "@/lib/logger";
// import { _HTTP, getHttpDescription } from "@/lib/http-status-codes";
// import { VStatusUnauthenticated } from "@/schemas/validator-schema/v-status";
// import type { ZodAny } from "zod";

// type TContentType = "application/json" | "text/plain";
// type ResponsesBlock = Record<
// 	number,
// 	{
// 		description: string;
// 		content: Partial<
// 			Record<
// 				"application/json" | "text/plain",
// 				{
// 					schema: any; // or whatever your resolver returns
// 				}
// 			>
// 		>;
// 	}
// >;

// class ResponsesBuilder {
// 	private responses: ResponsesBlock = {};

// 	add(config: {
// 		statusCode: number;
// 		description?: string;
// 		contentType?: TContentType;
// 		schema?: ZodAny;
// 	}): this {
// 		const {
// 			statusCode,
// 			description = getHttpDescription(statusCode),
// 			contentType = "application/json",
// 			schema,
// 		} = config;

// 		this.responses[statusCode] = {
// 			description,
// 			content: {
// 				[contentType]: {
// 					schema: schema ? resolver(schema) : undefined,
// 				},
// 			},
// 		};
// 		return this;
// 	}

// 	build(): ResponsesBlock {
// 		return this.responses;
// 	}
// }

// export function createResponses(): ResponsesBuilder {
// 	return new ResponsesBuilder();
// }

// function createResponses(
// 	responses: Array<{
// 		statusCode: number;
// 		description: string;
// 		contentType: TContentType;
// 		schema: any;
// 	}>,
// ): ResponsesBlock {
// 	return responses.reduce(
// 		(acc, { statusCode, description, contentType, schema }) => {
// 			acc[statusCode] = {
// 				description,
// 				content: {
// 					[contentType]: {
// 						schema,
// 					},
// 				},
// 			};
// 			return acc;
// 		},
// 		{} as ResponsesBlock,
// 	);
// }

// export const RStatusGet = (app: Hono) => {
// 	app.get("/",
// 		createResponses()
// 	);
// 	createRoute(app)
// 		.route({ method: "GET", path: "/" })
// 		.response({ statusCode: 200 })
// 		.logic(async () => {
// 			console.log();
// 		})
// 		.build();
// };
// // 		async (c) => {
// // 	const r = await LCalculateUnauthenticatedStatus();
// // 	logger.info(r);
// // 	if (r.serviceStatus === 0) {
// // 		return c.json(r, 200);
// // 	} else {
// // 		return c.json(r, 503);
// // 	}
// // },
