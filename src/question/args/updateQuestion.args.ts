import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateQuestionArgs {
    @Field((type)=> Int)
    id: number;

    @Field()
    question: string;
}