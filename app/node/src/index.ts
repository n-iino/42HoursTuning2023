import tracer from "dd-trace";
import { app } from "./app";
import { redisClient } from "./util/redis/redis";

tracer.init({
  hostname: "datadog-agent",
  port: 8126,
  env: process.env["DATADOG_ENV"] || "remote",
  logInjection: true,
  profiling: true,
});

redisClient.connect().then(() => {
  console.log(`redisに接続しました。`);

  const port = 8000;
  app.listen(port, () => {
    console.log(`ポート${port}番で起動しました。`);
  });
});
