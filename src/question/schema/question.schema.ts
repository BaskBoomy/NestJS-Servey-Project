import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Survey } from "src/survey/schema/survey.schema";

@ObjectType()
export class Question{
    @Field((type)=> Int)
    id: number;

    @Field()
    question: string;
    
    @Field(()=> Survey)
    survey: Survey;
}