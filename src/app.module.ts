import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { CatalogSchema } from './globals/schemas/catalog.schema'
import { QuestionSchema } from './globals/schemas/question.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      connectionName: 'quiz-weapp',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('host')}:27017/quiz-weapp`,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'question', schema: QuestionSchema, collection: 'questions' },
      { name: 'catalog', schema: CatalogSchema, collection: 'catalog' },
    ], 'quiz-weapp'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
