import { Application, Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { sendMessage } from "./core/mod.ts";
import { render } from "./lists.sr.ht/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/ping", async (context) => {
    await sendMessage("pong");
    context.response.body = "done";
  })
  .post("/webhook/lists", async (context) => {
    const body = context.request.body();

    try {
      const msg = await render(body);
      await sendMessage(msg);
    } catch (e) {
      console.error(e);
      context.response.body = e;
      context.response.status = Status.BadRequest;
      return 
    }

    context.response.body = "done";
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
