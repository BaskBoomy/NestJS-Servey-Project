import { CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { QuestionEntity } from './../../question/entity/question.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAnswerEntity } from 'src/user/answer/entity/userAnswer.entity';

@Entity({name: "answer"})
export class AnswerEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @Column()
    score: number;

    @Column()
    questionId: number;

    @ManyToOne(()=> QuestionEntity, (question)=> question.answers,{onDelete:"CASCADE"})
    question: QuestionEntity
    
    @OneToMany(()=> UserAnswerEntity, (userAnswer)=> userAnswer.answer)
    userAnswers: UserAnswerEntity[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}