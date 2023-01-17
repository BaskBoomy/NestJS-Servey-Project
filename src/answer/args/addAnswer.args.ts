import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddAnswerArgs {
    @Field()
    answer: string;

    @Field(()=> Int)
    score: number;

    @Field(()=>Int,{nullable:true})
    questionId: number;
}