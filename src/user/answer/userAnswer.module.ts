import { UserAnswerEntity } from 'src/user/answer/entity/userAnswer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserAnswerService } from './userAnswer.service';
import { UserAnswerResolver } from './userAnswer.resolver';
import { UserEntity } from '../auth/entity/user.entity';
import { SurveyEntity } from 'src/survey/entity/survey.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserAnswerEntity,UserEntity,SurveyEntity])],
    controllers:[],
    providers:[UserAnswerService,UserAnswerResolver],
})

export class UserAnswerModule{}