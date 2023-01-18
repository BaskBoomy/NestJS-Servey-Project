import { QuestionEntity } from './../../question/entity/question.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAnswerEntity } from 'src/user/answer/entity/userAnswer.entity';

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

    @OneToMany(()=> UserAnswerEntity, (userAnswer)=> userAnswer.survey, {cascade:true})
    userAnswers: UserAnswerEntity[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}