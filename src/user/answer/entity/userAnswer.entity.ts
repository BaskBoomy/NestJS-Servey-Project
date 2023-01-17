import { AnswerEntity } from '../../../answer/entity/answer.entity';
import { SurveyEntity } from '../../../survey/entity/survey.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(()=> QuestionEntity, (question)=> question.userAnswers)
    question: QuestionEntity | number;
    
    @ManyToOne(()=> AnswerEntity, (answer)=> answer.userAnswers)
    answer: AnswerEntity | number;
}