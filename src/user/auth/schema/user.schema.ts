import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User{
    @Field(()=>Int)
    id:number;

    @Field()
    name: string;

    @Field()
    phoneNumber: string;
    
    @Field(()=> Date)
    createdAt : Date;

    @Field(()=> Date)
    updatedAt : Date;
}