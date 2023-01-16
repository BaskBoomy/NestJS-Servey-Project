import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddSurveyArgs {
    @Field()
    title: string;

    @Field()
    description: string;
}