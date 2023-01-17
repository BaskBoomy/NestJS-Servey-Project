import { QuestionEntity } from './../question/entity/question.entity';
import { AnswerEntity } from './entity/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { Module } from '@nestjs/common';

@Module({
    imports:[TypeOrmModule.forFeature([AnswerEntity,QuestionEntity])],
    controllers:[],
    providers:[AnswerService, AnswerResolver],
})

export class AnswerModule{};