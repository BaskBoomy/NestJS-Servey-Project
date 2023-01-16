import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "survey"})
export class SurveyEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
}