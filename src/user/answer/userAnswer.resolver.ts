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
        return this.userAnswerService.findUserAnswerById(userId, surveyId);
    }

    @Mutation((returns => String), {name: 'submitSurvey'})
    submitSurvey(@Args("addUserAnswerArgs") addUserAnswer: AddUserAnswerArgs){
        return this.userAnswerService.addUserAnswer(addUserAnswer);
    }
}