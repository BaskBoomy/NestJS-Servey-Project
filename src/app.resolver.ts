import {Query, Resolver} from "@nestjs/graphql";

@Resolver(() => String)
export class AppResolver{

    @Query(returns => String)
    index(): string{
        return "Server setting";
    }
}