import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
    const PORT = process.env.PORT
    const app = await NestFactory.create(AppModule)
    

    const config = new DocumentBuilder()
        .setTitle('BackEnd Documentation')
        .setDescription('Full documentation on backend RestApi')
        .setVersion('1.0.0')
        .addTag('@keeeparis')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    
    app.setGlobalPrefix('api')
    app.enableCors()
    app.use(cookieParser())
    
    await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

bootstrap()
