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
import { NotFoundException } from '@nestjs/common/exceptions';
import { Answer } from 'src/answer/schema/answer.schema';
import {inspect} from 'util';
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
                relations:['user','survey','survey.questions','question','question.answers','answer']
            });

            if(!userAnswer){
                throw new NotFoundException('존재하지 않은 정보입니다.');
            }
            if(!userAnswer[0].user){
                throw new NotFoundException('존재하지 않은 User 입니다.');
            }
            if(!userAnswer[0].survey){
                throw new NotFoundException('존재하지 않은 Survey 입니다.');
            }
            
            let userSurveyResult = new UserAnswerResult();
            userSurveyResult.user = userAnswer[0].user as User;
            userSurveyResult.survey = userAnswer[0].survey as Survey;
            userSurveyResult.answers = [];
            userAnswer.forEach(x=>{
                let item = new UserResultAnswers();
                item.question = x.question;
                //사용자의 답안은 모두 배열로 반환한다.
                item.userAnswer = new Array<Answer>;
                item.userAnswer.push(x.answer);

                //중복응답의 질문일 경우
                let dupIndex = userSurveyResult.answers.findIndex(a=>a.question.id==item.question.id);
                if(dupIndex>-1) {
                    userSurveyResult.answers[dupIndex].userAnswer.push(item.userAnswer[0]);
                }else{
                    userSurveyResult.answers.push(item);
                }
            });

            //답변의 총점 계산
            userSurveyResult.totalScore = 
                userSurveyResult.answers.reduce((acc,cur)=>acc+cur.userAnswer.reduce((a,b)=>a+b.score,0),0);

            //createdAt, updatedAt
            userSurveyResult.createdAt = userAnswer[0].createdAt;
            userSurveyResult.updatedAt = userAnswer[0].updatedAt;
            
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
                item.questionId = answer.questionId;
                item.answerId = answer.answerId;
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
