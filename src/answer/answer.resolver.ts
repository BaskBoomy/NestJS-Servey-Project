import { UpdateAnswerArgs } from './args/updateAnswer.args';
import { AddAnswerArgs } from './args/addAnswer.args';
import { AnswerService } from './answer.service';
import { Answer } from './schema/answer.schema';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(()=> Answer)
export class AnswerResolver{
    constructor(private readonly answerService: AnswerService){}

    @Query((returns => [Answer]), {name: 'Answers'})
    getAllAnswers(){
        return this.answerService.findAllAnswer();
    }
    
    @Query((returns => Answer), {name: 'AnswerById'})
    getAnswerById(@Args({name:'answerId', type:()=>Int}) id:number){
        return this.answerService.findAnswerById(id);
    }

    @Mutation((returns => String), {name: 'deleteAnswer'})
    deleteAnswer(@Args({name:'answerId', type:()=>Int}) id:number){
        return this.answerService.deleteAnswer(id);
    }

    @Mutation((returns => String), {name: 'addAnswer'})
    addAnswer(@Args("addAnswerArgs") answer: AddAnswerArgs){
        return this.answerService.addAnswer(answer);
    }

    @Mutation((returns => String), {name: 'updateAnswer'})
    upadteAnswer(@Args("updateAnswerArgs") answer: UpdateAnswerArgs){
        return this.answerService.upadteAnswer(answer);
    }
}