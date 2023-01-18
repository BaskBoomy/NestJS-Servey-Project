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
        if(!id){
            throw new Error("답안 id가 입력되지 않았습니다.")
        }
        return this.answerService.findAnswerById(id);
    }

    @Mutation((returns => String), {name: 'deleteAnswer'})
    deleteAnswer(@Args({name:'answerId', type:()=>Int}) id:number){
        if(!id){
            throw new Error("답안 id가 입력되지 않았습니다.")
        }
        return this.answerService.deleteAnswer(id);
    }

    @Mutation((returns => String), {name: 'addAnswer'})
    addAnswer(@Args("addAnswerArgs") answer: AddAnswerArgs){
        if(answer.answer.length === 0){
            throw new Error("답안이 입력되지 않았습니다.")
        }
        if(!answer.score){
            throw new Error("답안의 점수가 입력되지 않았습니다.")
        }
        return this.answerService.addAnswer(answer);
    }

    @Mutation((returns => String), {name: 'updateAnswer'})
    upadteAnswer(@Args("updateAnswerArgs") answer: UpdateAnswerArgs){
        if(!answer.id){
            throw new Error("답안의 id가 입력되지 않았습니다.")
        }
        if(answer.answer.length === 0){
            throw new Error("답안이 입력되지 않았습니다.")
        }
        if(!answer.score){
            throw new Error("답안의 점수가 입력되지 않았습니다.")
        }
        return this.answerService.upadteAnswer(answer);
    }
}