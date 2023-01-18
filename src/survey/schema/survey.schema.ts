import { QuestionEntity } from './../../question/entity/question.entity';
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Question } from 'src/question/schema/question.schema';
@ObjectType()
export class Survey{
    @Field((type)=> Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(()=> [Question])
    questions: Question[];
    
    @Field(()=> Date)
    createdAt : Date;

    @Field(()=> Date)
    updatedAt : Date;
}