import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateSurveyArgs {
    @Field((type)=> Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;
}