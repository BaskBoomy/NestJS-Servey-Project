import { UpdateQuestionArgs } from './args/updateQuestion.args';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AddQuestionArgs } from "./args/addQuestion.args";
import { QuestionService } from "./question.service";
import { Question } from "./schema/question.schema";
import { AddQuestionsWithAnswers } from './args/addQuestionsWithAnswer.args';

@Resolver(()=> Question)
export class QuestionResolver{
    constructor(private readonly questionService: QuestionService){}

    @Query((returns => [Question]), {name: 'Questions'})
    getAllQuestions(){
        return this.questionService.findAllQuestion();
    }
    
    @Query((returns => Question), {name: 'QuestionById'})
    getQuestionById(@Args({name:'questionId', type:()=>Int}) id:number){
        if(!id){
            throw new Error("질문 id가 입력되지 않았습니다.")
        }
        return this.questionService.findQuestionById(id);
    }

    @Mutation((returns => String), {name: 'deleteQuestion'})
    deleteQuestion(@Args({name:'questionId', type:()=>Int}) id:number){
        if(!id){
            throw new Error("질문 id가 입력되지 않았습니다.")
        }
        return this.questionService.deleteQuestion(id);
    }

    @Mutation((returns => String), {name: 'addQuestion'})
    addQuestion(@Args("addQuestionArgs") question: AddQuestionArgs){
        if(!question.surveyId){
            throw new Error("설문지 id가 입력되지 않았습니다.")
        }
        if(!question.question){
            throw new Error("질문이 입력되지 않았습니다.")
        }
        return this.questionService.addQuestion(question);
    }

    @Mutation((returns => String), {name: 'addQuestionsWithAnswers'})
    addQuestionWithAnswers(@Args("addQuestionsWithAnsersArgs") questionsWithAnswers: AddQuestionsWithAnswers){
        if(!questionsWithAnswers.surveyId){
            throw new Error("설문지 id가 입력되지 않았습니다.")
        }
        if(questionsWithAnswers.questions.length === 0){
            throw new Error("질문이 입력되지 않았습니다.")
        }
        return this.questionService.addQuestionsWithAnswers(questionsWithAnswers);
    }

    @Mutation((returns => String), {name: 'updateQuestion'})
    upadteQuestion(@Args("updateQuestionArgs") question: UpdateQuestionArgs){
        if(!question.id){
            throw new Error("질문 id가 입력되지 않았습니다.")
        }
        if(!question.question){
            throw new Error("질문이 입력되지 않았습니다.")
        }
        return this.questionService.upadteQuestion(question);
    }
}