import { AnswerEntity } from 'src/answer/entity/answer.entity';
import { SurveyEntity } from './../survey/entity/survey.entity';
import { QuestionEntity } from './entity/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddQuestionArgs } from './args/addQuestion.args';
import { UpdateQuestionArgs } from './args/updateQuestion.args';
import { AddQuestionWithAnswers } from './args/addQuestionWithAnswer.args';
import { NotFoundException } from '@nestjs/common/exceptions';


@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(QuestionEntity) public readonly questionRepo : Repository<QuestionEntity>,
        @InjectRepository(SurveyEntity) public readonly surveyRepo : Repository<SurveyEntity>,
        @InjectRepository(AnswerEntity) public readonly answerRepo : Repository<AnswerEntity>){}

    async findAllQuestion() : Promise<QuestionEntity[]>{
        try{
            let questions = await this.questionRepo.find({
                relations:["survey","answers"],
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
                relations:["survey","answers"],
            });
            if(!question){
                throw new NotFoundException('존재하지 않은 id입니다.');
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
                throw new NotFoundException('존재하지 않은 id입니다.');
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
                throw new NotFoundException("존재하지 않은 설문지id 입니다.");
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

    async addQuestionWithAnswers(addQuestionWithAnswer: AddQuestionWithAnswers): Promise<String>{
        try{
            let survey = await this.surveyRepo.findOne({where:{id:addQuestionWithAnswer.surveyId}});
            if(!survey){
                throw new NotFoundException("존재하지 않은 설문지id 입니다.");
            }
            
            let question = new QuestionEntity();
            question.question = addQuestionWithAnswer.question;
            question.survey = survey;
            
            const inserted = await this.questionRepo.save(question);
            if(!inserted){
                throw new Error('질문이 등록되지 않았습니다.');
            }

            let answers : AnswerEntity[] = addQuestionWithAnswer.answers.map(x=>{
                let item = new AnswerEntity();
                item.answer = x.answer;
                item.score = x.score;
                item.questionId = inserted.id;
                return item;
            })
            await this.answerRepo.save(answers);
            return "질문이 등록되었습니다.";
        }catch(e){
            throw e;
        }
    }

    async upadteQuestion(updateQuestionArgs: UpdateQuestionArgs) : Promise<String>{
        try{
            let question = await this.questionRepo.findOne({where:{id:updateQuestionArgs.id}});
            if(!question){
                throw new NotFoundException("찾을 수 없는 질문입니다.");
            }
            question.question = updateQuestionArgs.question;

            await this.questionRepo.update({id:updateQuestionArgs.id},question);
            return "설문지가 수정 되었습니다.";
        }catch(e){
            throw e;
        }
    }

}