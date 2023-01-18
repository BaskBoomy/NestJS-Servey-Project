import { AnswerModule } from './answer/answer.module';
import { ConfigureModule } from './configure/configure.module';
import { QuestionModule } from './question/question.module';
import { SurveyModule } from './survey/survey.module';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { UserAnswerModule } from './user/answer/userAnswer.module';

@Module({
  imports: [
    ConfigureModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions:{
        path: join(process.cwd(), 'src/graphql.ts'),
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true,
    }),
    SurveyModule,
    QuestionModule,
    AnswerModule,
    UserAnswerModule
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
