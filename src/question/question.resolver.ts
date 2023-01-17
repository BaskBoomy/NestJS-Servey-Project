import { UpdateQuestionArgs } from './args/updateQuestion.args';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AddQuestionArgs } from "./args/addQuestion.args";
import { QuestionService } from "./question.service";
import { Question } from "./schema/question.schema";
import { AddQuestionWithAnswers } from './args/addQuestionWithAnswer.args';

@Resolver(()=> Question)
export class QuestionResolver{
    constructor(private readonly questionService: QuestionService){}

    @Query((returns => [Question]), {name: 'Questions'})
    getAllQuestions(){
        return this.questionService.findAllQuestion();
    }
    
    @Query((returns => Question), {name: 'QuestionById'})
    getQuestionById(@Args({name:'surveyId', type:()=>Int}) id:number){
        return this.questionService.findQuestionById(id);
    }

    @Mutation((returns => String), {name: 'deleteQuestion'})
    deleteQuestion(@Args({name:'surveyId', type:()=>Int}) id:number){
        return this.questionService.deleteQuestion(id);
    }

    @Mutation((returns => String), {name: 'addQuestion'})
    addQuestion(@Args("addQuestionArgs") question: AddQuestionArgs){
        return this.questionService.addQuestion(question);
    }

    @Mutation((returns => String), {name: 'addQuestionWithAnswers'})
    addQuestionWithAnswers(@Args("addQuestionWithAnsersArgs") questionWithAnswers: AddQuestionWithAnswers){
        return this.questionService.addQuestionWithAnswers(questionWithAnswers);
    }

    @Mutation((returns => String), {name: 'updateQuestion'})
    upadteQuestion(@Args("updateQuestionArgs") Question: UpdateQuestionArgs){
        return this.questionService.upadteQuestion(Question);
    }
}