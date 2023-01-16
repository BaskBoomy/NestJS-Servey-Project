import { SurveyResolver } from './survey.resolver';
import { SurveyEntity } from './entity/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity])],
  controllers: [],
  providers: [SurveyService, SurveyResolver],
})
export class SurveyModule {}
