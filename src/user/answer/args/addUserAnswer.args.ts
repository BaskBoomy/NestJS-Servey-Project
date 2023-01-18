import { createUnionType, Field, InputType, Int } from "@nestjs/graphql";

@InputType()
class UserAnswers{
    @Field((type)=> Int)
    questionId: number;

    @Field((type)=> Int)
    answerId: number;
}

@InputType()
export class AddUserAnswerArgs{
    @Field(()=> Int)
    userId: number;

    @Field(()=> Int)
    surveyId: number;

    @Field(()=> [UserAnswers])
    answers: UserAnswers[];
}