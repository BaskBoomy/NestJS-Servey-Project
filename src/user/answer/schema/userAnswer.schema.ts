import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Answer } from "src/answer/schema/answer.schema";
import { Question } from "src/question/schema/question.schema";
import { Survey } from "src/survey/schema/survey.schema";
import { User } from "src/user/auth/schema/user.schema";

@ObjectType()
export class UserAnswer{
    @Field(()=> Int)
    id: number;

    @Field(()=> User)
    user: User;

    @Field(()=> Survey)
    survey: Survey;

    @Field(()=> Question)
    question: Question;

    @Field(()=> Answer)
    answer: Answer;

    @Field(()=> Int)
    totalScore: number;
}