import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Survey{
    @Field((type)=> Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;
}