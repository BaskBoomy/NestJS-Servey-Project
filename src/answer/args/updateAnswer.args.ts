import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateAnswerArgs {
    @Field((type)=> Int)
    id: number;

    @Field()
    answer: string;

    @Field(()=> Int)
    score: number;
}