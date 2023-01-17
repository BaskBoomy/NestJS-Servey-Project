import { Field, InputType, Int } from "@nestjs/graphql";
import { AddAnswerArgs } from "src/answer/args/addAnswer.args";
@InputType()
export class AddQuestionWithAnswers{
    @Field(()=>Int)
    surveyId: number;

    @Field()
    question: string;

    @Field(()=> [AddAnswerArgs])
    answers: AddAnswerArgs[];
}