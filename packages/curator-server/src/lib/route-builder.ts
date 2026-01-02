import type { Hono, MiddlewareHandler } from "hono";
import { describeRoute, resolver } from "hono-openapi";
import { _HTTP } from "./http-status-codes";

type TContentType = "application/json";
interface IRouteParams {
	path: string;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	description?: string;
	tags?: string[];
}
type ResponsesBlock = Record<
	number,
	{
		description: string;
		content: Partial<
			Record<
				TContentType,
				{
					schema: any; // or whatever your resolver returns
				}
			>
		>;
	}
>;

function getHttpDescription(statusCode: number): string {
	for (const category of Object.values(_HTTP)) {
		if (statusCode in category) {
			return category[statusCode as keyof typeof category] as string;
		}
	}
	return "Unknown Status";
}

class RouteBuilderNeedsRoute {
	protected honoApp: Hono;

	constructor(app: Hono) {
		this.honoApp = app;
	}

	route(routeParams: IRouteParams): RouteBuilderNeedsLogic {
		return this as any as RouteBuilderNeedsLogic;
	}
}

// Step 2: Need at least one response
class RouteBuilderNeedsResponse extends RouteBuilderNeedsRoute {
	protected routeParams: IRouteParams;
	protected responses: ResponsesBlock = {};

	constructor(app: Hono, routeParams: IRouteParams) {
		super(app);
		this.routeParams = routeParams;
	}

	response(config: {
		statusCode: number;
		description?: string;
		contentType?: TContentType;
		schema?: any;
	}): RouteBuilderNeedsLogic {
		const {
			statusCode,
			description = getHttpDescription(statusCode),
			contentType = "application/json",
			schema,
		} = config;

		this.responses[statusCode] = {
			description,
			content: {
				[contentType]: {
					schema: schema ? resolver(schema) : undefined,
				},
			},
		};
		return this as any as RouteBuilderNeedsLogic;
	}
}

// Step 3: Can add more responses, then must call logic
class RouteBuilderNeedsLogic extends RouteBuilderNeedsResponse {
	protected logicFn?: MiddlewareHandler;

	logic(logicFn: MiddlewareHandler): RouteBuilderComplete {
		this.logicFn = logicFn;
		return this as any as RouteBuilderComplete;
	}
}

// Step 4: Can build and register with Hono
class RouteBuilderComplete extends RouteBuilderNeedsLogic {
	protected describeRouteFn?: MiddlewareHandler;

	build(): Hono {
		this.describeRouteFn = describeRoute({
			description: this.routeParams?.description,
			tags: this.routeParams?.tags,
			responses: this.responses,
		});

		switch (this.routeParams.method) {
			case "GET":
				this.honoApp.get(
					this.routeParams.path,
					this.describeRouteFn,
					async (c) => {
						this.logicFn;
					},
				);
				break;
			case "POST":
				this.honoApp.post(
					this.routeParams.path,
					this.describeRouteFn,
					async (c) => {
						this.logicFn;
					},
				);
				break;
			case "PUT":
				this.honoApp.put(
					this.routeParams.path,
					this.describeRouteFn,
					async (c) => {
						this.logicFn;
					},
				);
				break;
			case "PATCH":
				this.honoApp.patch(
					this.routeParams.path,
					this.describeRouteFn,
					async (c) => {
						this.logicFn;
					},
				);
				break;
			case "DELETE":
				this.honoApp.delete(
					this.routeParams.path,
					this.describeRouteFn,
					async (c) => {
						this.logicFn;
					},
				);
				break;
		}
		return this.honoApp;
	}
}

export function createRoute(app: Hono): RouteBuilderNeedsRoute {
	return new RouteBuilderNeedsRoute(app);
}
