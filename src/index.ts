import type { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import Router from "./router";

type Request = {
  method: string;
  path: string;
} & APIGatewayProxyEventV2;

const router = new Router<Request, APIGatewayProxyResult>();

router.get(/^\/hello$/, (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello, World!"),
  };
});

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
  return router.handleRequest({
    method: event.requestContext.http.method,
    path: event.rawPath,
    ...event,
  });
};
