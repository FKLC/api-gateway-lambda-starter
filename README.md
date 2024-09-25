# API Gateway with Lambda Integration Starter

This is a starter project for creating an API using API Gateway with Lambda integration.

## How to use

1. Create a route in API Gateway as `/{path+}` and select a Lambda function as the integration.
2. Write your API logic in [src/index.ts](src/index.ts).
3. Run `npm run build` to compile the TypeScript code.
4. Deploy the Lambda function to AWS by uploading [dist/index.mjs](dist/index.mjs).
