import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddQuestionArgs {
    @Field()
    question: string;

    @Field(()=>Int)
    surveyId: number;
}