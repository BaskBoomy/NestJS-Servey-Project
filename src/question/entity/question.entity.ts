import { UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { AnswerEntity } from './../../answer/entity/answer.entity';
import { SurveyEntity } from './../../survey/entity/survey.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAnswerEntity } from 'src/user/answer/entity/userAnswer.entity';

@Entity({name: "question"})
export class QuestionEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    question: string;

    @ManyToOne(() => SurveyEntity, (survey)=> survey.questions, {onDelete:"CASCADE"})
    survey: SurveyEntity;

    @OneToMany(() => AnswerEntity, (answer)=> answer.question)
    answers: AnswerEntity[];

    @OneToMany(()=> UserAnswerEntity, (userAnswer)=> userAnswer.question)
    userAnswers: UserAnswerEntity[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}