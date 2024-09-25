type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type Route<Req, Res> = {
  method: HttpMethod;
  path: RegExp;
  handler: (event: Req) => Res;
};

interface Request {
  method: string;
  path: string;
}

export default class Router<Req extends Request, Res> {
  private routes: Route<Req, Res>[] = [];

  get: (path: RegExp, handler: (event: Req) => Res) => void;
  post: (path: RegExp, handler: (event: Req) => Res) => void;
  put: (path: RegExp, handler: (event: Req) => Res) => void;
  delete: (path: RegExp, handler: (event: Req) => Res) => void;

  constructor() {
    const addHandler = (method: HttpMethod) => (path: RegExp, handler: (event: Req) => Res) => {
      this.routes.push({
        method,
        path,
        handler,
      });
    };
    this.get = addHandler("GET");
    this.post = addHandler("POST");
    this.put = addHandler("PUT");
    this.delete = addHandler("DELETE");
  }

  getRoutes() {
    return this.routes;
  }

  matchRoute(method: string, path: string) {
    return this.routes.find(route => route.method == method && route.path.test(path));
  }

  handleRequest(event: Req) {
    const route = this.matchRoute(event.method, event.path);
    if (route) {
      return route.handler(event);
    }

    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Not Found",
      }),
    };
  }
}