import { UserAnswerEntity } from "src/user/answer/entity/userAnswer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;
    
    @OneToMany(()=> UserAnswerEntity, (userAnswer)=> userAnswer.user, {cascade:true})
    userAnswers: UserAnswerEntity;
}