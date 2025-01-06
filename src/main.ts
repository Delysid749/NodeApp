import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 可选：设定全局 API 前缀
    app.setGlobalPrefix('api');

    // 监听端口
    const port = 3000;
    await app.listen(port);

    const logger = new Logger('SQLLogger');
    app.useLogger(logger);

    console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
