import { SurveyEntity } from 'src/survey/entity/survey.entity';
import { QuestionEntity } from './entity/question.entity';
import { QuestionResolver } from './question.resolver';
import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([QuestionEntity, SurveyEntity])],
    controllers:[],
    providers:[QuestionService, QuestionResolver],
})

export class QuestionModeul{}