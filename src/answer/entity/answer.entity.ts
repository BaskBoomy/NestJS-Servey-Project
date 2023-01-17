import { Entity, OneToMany } from 'typeorm';
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

    @ManyToOne(()=> QuestionEntity, (question)=> question.answers)
    question: QuestionEntity
    
    @OneToMany(()=> UserAnswerEntity, (userAnswer)=> userAnswer.answer, {cascade:true})
    userAnswers: UserAnswerEntity[];
}