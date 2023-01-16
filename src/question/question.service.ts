import { SurveyEntity } from './../survey/entity/survey.entity';
import { QuestionEntity } from './entity/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddQuestionArgs } from './args/addQuestion.args';
import { UpdateQuestionArgs } from './args/updateQuestion.args';


@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(QuestionEntity) public readonly questionRepo : Repository<QuestionEntity>,
        @InjectRepository(SurveyEntity) public readonly surveyRepo : Repository<SurveyEntity>){}

    async findAllQuestion() : Promise<QuestionEntity[]>{
        try{
            let questions = await this.questionRepo.find({
                relations:{survey: true}
            });
            return questions;
        }catch(e){
            throw e;
        }
    }

    async findQuestionById(id : number) : Promise<QuestionEntity>{
        try{
            let question = await this.questionRepo.findOne({
                where:{id:id},
                relations:{survey:true}
            });
            if(!question){
                throw new Error('존재하지 않은 id입니다.');
            }
            return question;
        }catch(e){
            throw e;
        }
    }

    async deleteQuestion(id : number) : Promise<String>{
        try{
            let question = await this.questionRepo.findOne({where:{id:id}});
            if(!question){
                throw new Error('존재하지 않은 id입니다.');
            }
            await this.questionRepo.delete(id);
            return "해당 질문이 삭제되었습니다."
        }catch(e){
            throw e;
        }
    }
    
    async addQuestion(addSurveyArgs: AddQuestionArgs) : Promise<String>{
        try{
            let survey = await this.surveyRepo.findOne({where:{id:addSurveyArgs.surveyId}});
            if(!survey){
                throw new Error("존재하지 않은 설문지id 입니다.");
            }
            let question = new QuestionEntity();
            question.question = addSurveyArgs.question;
            question.survey = survey;
            
            await this.questionRepo.save(question);
            return "질문이 생성되었습니다.";
        }catch(e){
            throw e;
        }
    }

    async upadteQuestion(updateQuestionArgs: UpdateQuestionArgs) : Promise<String>{
        try{
            let question = await this.questionRepo.findOne({where:{id:updateQuestionArgs.id}});
            if(!question){
                throw new Error("찾을 수 없는 질문입니다.");
            }
            question.question = updateQuestionArgs.question;

            await this.questionRepo.save(question);
            return "설문지가 수정 되었습니다.";
        }catch(e){
            throw e;
        }
    }

}