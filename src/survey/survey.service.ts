import { UpdateSurveyArgs } from './args/updateSurvey.args';
import { AddSurveyArgs } from './args/addSurvey.args';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyEntity } from './entity/survey.entity';

@Injectable()
export class SurveyService{
    constructor(@InjectRepository(SurveyEntity) public readonly surveyRepo : Repository<SurveyEntity>){}

    async findAllSurvey() : Promise<SurveyEntity[]>{
        try{
            let surveys = await this.surveyRepo.find({
                relations:['questions','questions.answers']});
            return surveys;
        }catch(e){
            throw e;
        }
    }
    
    async findSurveyById(id : number) : Promise<SurveyEntity>{
        try{
            let survey = await this.surveyRepo.findOne({
                where:{id:id},
                relations:['questions','questions.answers']});
            if(!survey){
                throw new Error('존재하지 않은 id입니다.');
            }
            return survey;
        }catch(e){
            throw e;
        }
    }

    async deleteSurvey(id : number) : Promise<String>{
        try{
            let survey = await this.surveyRepo.findOne({where:{id:id}});
            if(!survey){
                throw new Error('존재하지 않은 id입니다.');
            }
            await this.surveyRepo.delete(id);
            return "해당 설문지가 삭제되었습니다."
        }catch(e){
            throw e;
        }
    }
    
    async addSurvey(addSurveyArgs: AddSurveyArgs) : Promise<String>{
        try{
            let survey = new SurveyEntity();
            survey.title = addSurveyArgs.title;
            survey.description = addSurveyArgs.description;

            await this.surveyRepo.save(survey);
            return "설문지가 생성되었습니다.";
        }catch(e){
            throw e;
        }
    }

    async upadteSurvey(updateSurveyArgs: UpdateSurveyArgs) : Promise<String>{
        try{
            let survey = await this.surveyRepo.findOne({where:{id:updateSurveyArgs.id}});
            if(!survey){
                throw new Error("찾을 수 없는 설문지입니다.");
            }
            survey.title = updateSurveyArgs.title;
            survey.description = updateSurveyArgs.description;
            
            await this.surveyRepo.update({id:updateSurveyArgs.id},survey);
            return "설문지가 수정 되었습니다.";
        }catch(e){
            throw e;
        }
    }

}