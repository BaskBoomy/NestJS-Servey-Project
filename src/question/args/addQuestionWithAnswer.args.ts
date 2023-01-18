import { Field, InputType, Int } from "@nestjs/graphql";
import { AddAnswerArgs } from "src/answer/args/addAnswer.args";

@InputType()
export class Questions{
    @Field()
    question: string;

    @Field(()=> [AddAnswerArgs])
    answers: AddAnswerArgs[];
}

@InputType()
export class AddQuestionsWithAnswers{
    @Field(()=>Int)
    surveyId: number;

    @Field(()=> [Questions])
    questions: Questions[];
}
