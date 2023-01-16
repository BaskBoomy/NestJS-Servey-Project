import { QuestionEntity } from './../../question/entity/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "survey"})
export class SurveyEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(()=> QuestionEntity, (question)=> question.survey, {cascade:true})
    questions: QuestionEntity[];
}