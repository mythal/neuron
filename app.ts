import { Application, Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts";
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
    context.response.body = `Set this in header as  \`SECRET: xxx\`.
-----BEGIN PGP MESSAGE-----

hQGMAxPpbFAX46xSAQv/Vz1+7Qc/xrDRZ4Zzi5c1o9J+ql3e33nH8Uq1vVA6cIHR
48Nc5zShF5PFxw7p7TXH7Eaj1dDdNxvZiEz+NuLWxosawotYvmbpuCNiE83sfy5k
6F7lxqAVDK16GTQSdb88spmHUe0B7ICsGWQRYO41EG0zKoQKA9BKhJ3JXGULLLe+
+Oi7ple/tOLLk+1WtoNeKqaX6ABFQf6mOVMPn52UBySNCGVSHQGEz4y2W3MvYwY1
xQxinSY8HNnkGoXGd2CFX/Ds4ocLb1mjTGGw+mzvQHzPHZnXCnRLgMP9tLZLfq2q
L8YaVz3FZ+nVCB1xx9h8hw+50zbnAgRNXDTCSvX5tHhAZuIRf14YL9srCXPWd5N0
jbDt7/iYxbYEJb4lN4qP6cjnIkx5703OkB7bDJkTwzsQYlrus7kF9vuNCYNmeet2
t1/jtKr+EGgCojVMHirv8QXlBFB1BjaqUCPRg7WEeGC/YZ5b8s416zvUO/W7BV5T
9sAKCq3gd8VRHyYdUSC4hQIMA7LF3mkfbQTxAQ//Ykd9y3tG3xsgZyKETGZIKgaa
YlHuUhLoINk0oLb4sDd3h1hsLKhGkSdOSIlgzeCoEzFC36u6V2NacbJm0995YcMw
xJGRt75aqhFjrhVvLpeBNhxpZnENd1LI292m8E8GxrHaZ1emKAFDeRaAWt01ne1V
iFQk+B9fuNgwJuVcUaoms8VkB0LRdrAEd6K40QBzWr4YzV0/XST+Rf56G90QSTii
BGgb0C5zrLL4HLbo3Klcp0t5yeJP06PjZmQF20Ej8MYCb6qqaNQmy2Szty4uFxV7
hgjM9nQBG8ZIsQGhVvV/pmQAXIR5jgSu+LZFobLlls05F4Hu49XIcQLAf//xih7b
25ORi6Lem5TOJVU97yatt2EamT90OtG7rY2YI9+O/AofP9VI99SdW5v52CgQkHtW
ZEPpz4/x+SnfDhKSyDIYXqPEOSacuVjRsT1AaH/RdkjwmBX5tDHOgpGHEBCFG3pC
a/TEPLhbAEHw+0nOMD3tkCJN51803Vy6M2noE0sP3MrxB0F6uoNKlJvsW5G4B4BP
idhBRsMe1k79uBqUsLlj8rF/bd+mHVvEFDmPXF4Jk9Ggyfem40B7iADHr2CFQmkP
n4YjthEotTTY6tugLvjOJWUWO1pKUm/DFaGaEc0E+sFYasQvDJshPAKUmwsPWzSv
85ENKHvwhjMlXBcPVdbSTQFkxmRDI2ZMDs6H6AZJXkVMqtiZ/Hj3tgSbfZb8T/+Y
bxSDZ2LCMhk6+4SnchAwWd7LuEC1vFV6QtYl/swpzo1qJHpW5iJ7yTXtLE5H
=6vk6
-----END PGP MESSAGE-----`;
    context.response.status = Status.Forbidden;
    context.respond = true;
  } else {
    await next();
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
