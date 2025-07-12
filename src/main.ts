import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
