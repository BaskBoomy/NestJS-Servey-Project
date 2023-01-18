import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import Joi from "joi";


@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.dev',
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required()
            })
        }),
    ],
})

export class ConfigureModule{}