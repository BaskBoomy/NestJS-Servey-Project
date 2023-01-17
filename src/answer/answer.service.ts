import { QuestionEntity } from './../question/entity/question.entity';
import { UpdateAnswerArgs } from './args/updateAnswer.args';
import { AddAnswerArgs } from './args/addAnswer.args';
import { AnswerEntity } from './entity/answer.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

export class AnswerService{
    constructor(
        @InjectRepository(AnswerEntity) public readonly answerRepo: Repository<AnswerEntity>,
        @InjectRepository(QuestionEntity) public readonly questionRepo: Repository<QuestionEntity>){}

    async findAllAnswer() : Promise<AnswerEntity[]>{
        try{
            let answers = await this.answerRepo.find({
                relations:{question: true}
            });
            return answers;
        }catch(e){
            throw e;
        }
    }

    async findAnswerById(id : number) : Promise<AnswerEntity>{
        try{
            let answer = await this.answerRepo.findOne({
                where:{id:id},
                relations:{question:true}
            });
            if(!answer){
                throw new Error('존재하지 않은 id입니다.');
            }
            return answer;
        }catch(e){
            throw e;
        }
    }

    async deleteAnswer(id : number) : Promise<String>{
        try{
            let answer = await this.answerRepo.findOne({where:{id:id}});
            if(!answer){
                throw new Error('존재하지 않은 id입니다.');
            }
            await this.answerRepo.delete(id);
            return "해당 답안이 삭제되었습니다."
        }catch(e){
            throw e;
        }
    }
    
    async addAnswer(addAnswerArgs: AddAnswerArgs) : Promise<String>{
        try{
            let question = await this.questionRepo.findOne({where:{id:addAnswerArgs.questionId}});
            if(!question){
                throw new Error("존재하지 않은 question id 입니다.");
            }
            let answer = new AnswerEntity();
            answer.answer = addAnswerArgs.answer;
            answer.score = addAnswerArgs.score;
            answer.question = question;
            
            await this.answerRepo.save(answer);
            return "답안이 생성되었습니다.";
        }catch(e){
            throw e;
        }
    }

    async upadteAnswer(updateAnswerArgs: UpdateAnswerArgs) : Promise<String>{
        try{
            let answer = await this.answerRepo.findOne({where:{id:updateAnswerArgs.id}});
            if(!answer){
                throw new Error("찾을 수 없는 질문입니다.");
            }
            answer.answer = updateAnswerArgs.answer;
            answer.score = updateAnswerArgs.score;

            await this.answerRepo.save(answer);
            return "설문지가 수정 되었습니다.";
        }catch(e){
            throw e;
        }
    }
}