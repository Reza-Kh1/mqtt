import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
const app = await NestFactory.create(AppModule, {
  logger: ['log', 'debug', 'error', 'warn'],
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API documentation for my NestJS project')
      .setVersion('1.0')
      .addServer('http://localhost:3000', 'Localhost')
      .addServer('https://domaintest.com', 'Production')
      .addTag('Test Mqtt')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });

await app.startAllMicroservices()
  .then(() => console.log('✅ Microservice MQTT وصل شد'))
  .catch((err) => console.error('❌ اتصال به MQTT شکست خورد:', err));
  await app.listen(process.env.PORT ?? 3000);
  
}

bootstrap();
