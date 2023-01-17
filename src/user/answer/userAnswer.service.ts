import { SurveyEntity } from 'src/survey/entity/survey.entity';
import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserAnswerArgs } from './args/addUserAnswer.args';
import { UserAnswerEntity } from './entity/userAnswer.entity';
import { UserEntity } from '../auth/entity/user.entity';
import { User } from '../auth/schema/user.schema';
import { Survey } from 'src/survey/schema/survey.schema';
import { UserAnswerResult, UserResultAnswers } from './schema/userAnswerResult.schema';
import { QuestionEntity } from 'src/question/entity/question.entity';
import { AnswerEntity } from 'src/answer/entity/answer.entity';

@Injectable()
export class UserAnswerService{
    constructor(
        @InjectRepository(UserAnswerEntity) private readonly userAnswerRepo : Repository<UserAnswerEntity>,
        @InjectRepository(UserEntity) private readonly userRepo : Repository<UserEntity>,
        @InjectRepository(SurveyEntity) private readonly surveyRepo : Repository<SurveyEntity>,
    ){}

    async findUserAnswerById(userId: number,surveyId: number): Promise<UserAnswerResult>{
        try{
            let userAnswer = await this.userAnswerRepo.find({
                where:{
                    userId:userId,
                    surveyId:surveyId
                },
                relations:['user','survey','survey.questions','question','answer']
            });

            if(!userAnswer){
                throw new Error('존재하지 않은 정보입니다.');
            }
            
            let userSurveyResult = new UserAnswerResult();
            userSurveyResult.user = userAnswer[0].user as User;
            userSurveyResult.survey = userAnswer[0].survey as Survey;
            userSurveyResult.answers = userAnswer.map(x=>{
                console.log(x.question);
                let item = new UserResultAnswers();
                item.question = x.question as QuestionEntity;
                item.answer = x.answer as AnswerEntity;
                return item;
            });
            userSurveyResult.totalScore = 
            userSurveyResult.answers.reduce((acc,cur)=>acc+cur.answer.score,0);

            return userSurveyResult;
        }catch(e){
            throw e;
        }
    }

    async addUserAnswer(addUserAnswerArgs: AddUserAnswerArgs){
        try{
            //유효성 검사
            let {userId, surveyId, answers} = addUserAnswerArgs;
            let [user, survey] = await Promise.all([
                await this.userRepo.findOne({where:{id:userId}}),
                await this.surveyRepo.findOne({where:{id:surveyId}}),
            ]);
            if(!user){
                throw new Error('존재하지 user 입니다.')
            }
            if(!survey){
                throw new Error('존재하지 설문지 id 입니다.')
            }

            let userAnswer: UserAnswerEntity[] = answers.map(answer=>{
                let item = new UserAnswerEntity();
                item.userId = userId;
                item.surveyId = surveyId;
                item.question = answer.questionId;
                item.answer = answer.answerId;
                return item;
            });
            console.log(userAnswer);

            await this.userAnswerRepo.save(userAnswer);
            return "설문지 작성을 완료하였습니다.";
        }catch(e){
            throw e;
        }
    }
}
