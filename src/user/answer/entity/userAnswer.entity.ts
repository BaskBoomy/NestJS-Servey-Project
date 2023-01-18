import { AnswerEntity } from '../../../answer/entity/answer.entity';
import { SurveyEntity } from '../../../survey/entity/survey.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuestionEntity } from 'src/question/entity/question.entity';
import { UserEntity } from 'src/user/auth/entity/user.entity';

@Entity({name:"userAnswer"})
export class UserAnswerEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(()=> UserEntity, (user)=> user.userAnswers)
    user: UserEntity;

    @Column()
    surveyId: number;

    @ManyToOne(()=> SurveyEntity, (survey)=> survey.userAnswers)
    survey: SurveyEntity;

    @Column()
    questionId: number;

    @ManyToOne(()=> QuestionEntity, (question)=> question.userAnswers)
    question: QuestionEntity;
    
    @Column()
    answerId: number;

    @ManyToOne(()=> AnswerEntity, (answer)=> answer.userAnswers)
    answer: AnswerEntity;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}