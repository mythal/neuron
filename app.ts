import { Application, Context, Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { sendMessage } from "./core/mod.ts";

const SECRET = Deno.env.get("SECRET") ?? Deno.exit(-1);

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/ping", async (context) => {
    await sendMessage("pong");
    context.response.body = "done";
  });

const app = new Application();

app.use(async (context, next) => {
  if (context.request.headers.get("SECRET") != SECRET) {
    context.response.body = "Yyyyy";
    context.response.status = Status.Forbidden;
    context.respond = true;
  } else {
    await next();
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
