import { Int } from '@nestjs/graphql';
import { Args, Mutation } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AddUserAnswerArgs } from './args/addUserAnswer.args';
import { UserAnswerResult } from './schema/userAnswerResult.schema';
import { UserAnswerService } from "./userAnswer.service";


@Resolver(()=> UserAnswerResult)
export class UserAnswerResolver{
    constructor(private readonly userAnswerService: UserAnswerService){}

    @Query((returns => UserAnswerResult), {name: 'userAnswersById'})
    getUserAnswersById(
        @Args({name:"userId", type:()=>Int}) userId: number,
        @Args({name:"surveyId", type:()=>Int}) surveyId: number ){
            if(!userId){
                throw new Error("사용자 id가 입력되지 않았습니다.");
            }
            if(!surveyId){
                throw new Error("설문지 id가 입력되지 않았습니다.");
            }
        return this.userAnswerService.findUserAnswerById(userId, surveyId);
    }

    @Mutation((returns => String), {name: 'submitSurvey'})
    submitSurvey(@Args("addUserAnswerArgs") addUserAnswer: AddUserAnswerArgs){
        if(!addUserAnswer.userId){
            throw new Error("사용자 id가 입력되지 않았습니다.");
        }
        if(!addUserAnswer.surveyId){
            throw new Error("설문지 id가 입력되지 않았습니다.");
        }
        if(addUserAnswer.answers.length === 0){
            throw new Error("답변이 입력되지 않았습니다.");
        }
        return this.userAnswerService.addUserAnswer(addUserAnswer);
    }
}