import { UpdateQuestionArgs } from './args/updateQuestion.args';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AddQuestionArgs } from "./args/addQuestion.args";
import { QuestionService } from "./question.service";
import { Question } from "./schema/question.schema";

@Resolver(()=> Question)
export class QuestionResolver{
    constructor(private readonly questionService: QuestionService){}

    @Query((returns => [Question]), {name: 'Questions'})
    getAllQuestions(){
        return this.questionService.findAllQuestion();
    }
    
    @Query((returns => Question), {name: 'QuestionById'})
    getQuestionById(@Args({name:'serveyId', type:()=>Int}) id:number){
        return this.questionService.findQuestionById(id);
    }

    @Mutation((returns => String), {name: 'deleteQuestion'})
    deleteQuestion(@Args({name:'serveyId', type:()=>Int}) id:number){
        return this.questionService.deleteQuestion(id);
    }

    @Mutation((returns => String), {name: 'addQuestion'})
    addQuestion(@Args("addQuestionArgs") Question: AddQuestionArgs){
        return this.questionService.addQuestion(Question);
    }

    @Mutation((returns => String), {name: 'updateQuestion'})
    upadteQuestion(@Args("updateQuestionArgs") Question: UpdateQuestionArgs){
        return this.questionService.upadteQuestion(Question);
    }
}