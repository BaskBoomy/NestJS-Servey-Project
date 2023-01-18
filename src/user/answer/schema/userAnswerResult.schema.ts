import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Answer } from "src/answer/schema/answer.schema";
import { Question } from "src/question/schema/question.schema";
import { Survey } from "src/survey/schema/survey.schema";
import { User } from "src/user/auth/schema/user.schema";

@ObjectType()
export class UserResultAnswers{
    @Field((type)=> Question)
    question: Question;

    @Field((type)=> [Answer])
    userAnswer: Answer[];
}

@ObjectType()
export class UserAnswerResult{
    @Field(()=> User)
    user: User;

    @Field(()=> Survey)
    survey: Survey;

    @Field(()=> [UserResultAnswers])
    answers: UserResultAnswers[];

    @Field(()=> Int)
    totalScore: number;
    
    @Field(()=> Date)
    createdAt : Date;

    @Field(()=> Date)
    updatedAt : Date;
}