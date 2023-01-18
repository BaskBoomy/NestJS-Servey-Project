import { Int, ObjectType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { Question } from 'src/question/schema/question.schema';

@ObjectType()
export class Answer{
    @Field(()=> Int)
    id: number;

    @Field()
    answer: string;

    @Field(()=> Int)
    score: number;

    @Field(()=> Question)
    question: Question
    
    @Field(()=> Date)
    createdAt : Date;

    @Field(()=> Date)
    updatedAt : Date;
}