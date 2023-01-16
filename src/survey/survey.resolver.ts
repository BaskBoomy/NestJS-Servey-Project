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
    getSurveyById(@Args({name:'serveyId', type:()=>Int}) id:number){
        return this.surveyService.findSurveyById(id);
    }

    @Mutation((returns => String), {name: 'deleteSurvey'})
    deleteSurvey(@Args({name:'serveyId', type:()=>Int}) id:number){
        return this.surveyService.deleteSurvey(id);
    }

    @Mutation((returns => String), {name: 'addSurvey'})
    addSurvey(@Args("addSurveyArgs") survey: AddSurveyArgs){
        return this.surveyService.addSurvey(survey);
    }

    @Mutation((returns => String), {name: 'updateSurvey'})
    upadteSurvey(@Args("updateSurveyArgs") survey: UpdateSurveyArgs){
        return this.surveyService.upadteSurvey(survey);
    }
}