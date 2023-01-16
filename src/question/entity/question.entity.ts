import { SurveyEntity } from './../../survey/entity/survey.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "question"})
export class QuestionEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    question: string;

    @ManyToOne(() => SurveyEntity, (survey)=> survey.questions)
    survey: SurveyEntity;
}