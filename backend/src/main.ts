import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:3000", "https://foodio-xi.vercel.app"],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 5000;
  await app.listen(port, "0.0.0.0");
  console.log(`Server is successfully running on: http://localhost:${port}`);
}

bootstrap();
