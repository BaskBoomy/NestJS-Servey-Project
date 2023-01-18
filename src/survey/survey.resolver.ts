import { UpdateSurveyArgs } from './args/updateSurvey.args';
import { AddSurveyArgs } from './args/addSurvey.args';
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Survey } from "./schema/survey.schema";
import { SurveyService } from "./survey.service";

@Resolver(()=> Survey)
export class SurveyResolver{
    constructor(private readonly surveyService: SurveyService){}

    @Query((returns => [Survey]), {name: 'surveys'})
    getAllSurveys(){
        return this.surveyService.findAllSurvey();
    }
    
    @Query((returns => Survey), {name: 'surveyById'})
    getSurveyById(@Args({name:'surveyId', type:()=>Int}) id:number){
        if(!id){
            throw new Error("설문지 id가 입력되지 않았습니다.");
        }
        return this.surveyService.findSurveyById(id);
    }

    @Mutation((returns => String), {name: 'deleteSurvey'})
    deleteSurvey(@Args({name:'surveyId', type:()=>Int}) id:number){
        if(!id){
            throw new Error("설문지 id가 입력되지 않았습니다.");
        }
        return this.surveyService.deleteSurvey(id);
    }

    @Mutation((returns => String), {name: 'addSurvey'})
    addSurvey(@Args("addSurveyArgs") survey: AddSurveyArgs){
        if(survey.title.length === 0){
            throw new Error("설문지 title이 입력되지 않았습니다.");
        }
        if(survey.description.length === 0){
            throw new Error("설문지 description이 입력되지 않았습니다.");
        }
        return this.surveyService.addSurvey(survey);
    }

    @Mutation((returns => String), {name: 'updateSurvey'})
    upadteSurvey(@Args("updateSurveyArgs") survey: UpdateSurveyArgs){
        if(survey.title.length === 0){
            throw new Error("설문지 title이 입력되지 않았습니다.");
        }
        if(survey.description.length === 0){
            throw new Error("설문지 description이 입력되지 않았습니다.");
        }
        return this.surveyService.upadteSurvey(survey);
    }
}