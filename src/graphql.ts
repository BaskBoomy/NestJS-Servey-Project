
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddSurveyArgs {
    title: string;
    description: string;
}

export interface UpdateSurveyArgs {
    id: number;
    title: string;
    description: string;
}

export interface AddQuestionArgs {
    question: string;
    surveyId: number;
}

export interface AddQuestionWithAnswers {
    surveyId: number;
    question: string;
    answers: AddAnswerArgs[];
}

export interface AddAnswerArgs {
    answer: string;
    score: number;
    questionId?: Nullable<number>;
}

export interface UpdateQuestionArgs {
    id: number;
    question: string;
}

export interface UpdateAnswerArgs {
    id: number;
    answer: string;
    score: number;
}

export interface AddUserAnswerArgs {
    userId: number;
    surveyId: number;
    answers: UserAnswers[];
}

export interface UserAnswers {
    questionId: number;
    answerId: number;
}

export interface Survey {
    id: number;
    title: string;
    description: string;
    questions: Question[];
}

export interface Question {
    id: number;
    question: string;
    survey: Survey;
    answers: Answer[];
}

export interface Answer {
    id: number;
    answer: string;
    score: number;
    question: Question;
}

export interface User {
    id: number;
    name: string;
    phoneNumber: string;
}

export interface UserResultAnswers {
    question: Question;
    answer: Answer;
}

export interface UserAnswerResult {
    user: User;
    survey: Survey;
    answers: UserResultAnswers[];
    totalScore: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    surveys(): Survey[] | Promise<Survey[]>;
    surveyById(surveyId: number): Survey | Promise<Survey>;
    Questions(): Question[] | Promise<Question[]>;
    QuestionById(surveyId: number): Question | Promise<Question>;
    Answers(): Answer[] | Promise<Answer[]>;
    AnswerById(answerId: number): Answer | Promise<Answer>;
    UserAnswers(userId: number, surveyId: number): UserAnswerResult | Promise<UserAnswerResult>;
}

export interface IMutation {
    deleteSurvey(surveyId: number): string | Promise<string>;
    addSurvey(addSurveyArgs: AddSurveyArgs): string | Promise<string>;
    updateSurvey(updateSurveyArgs: UpdateSurveyArgs): string | Promise<string>;
    deleteQuestion(surveyId: number): string | Promise<string>;
    addQuestion(addQuestionArgs: AddQuestionArgs): string | Promise<string>;
    addQuestionWithAnswers(addQuestionWithAnsersArgs: AddQuestionWithAnswers): string | Promise<string>;
    updateQuestion(updateQuestionArgs: UpdateQuestionArgs): string | Promise<string>;
    deleteAnswer(answerId: number): string | Promise<string>;
    addAnswer(addAnswerArgs: AddAnswerArgs): string | Promise<string>;
    updateAnswer(updateAnswerArgs: UpdateAnswerArgs): string | Promise<string>;
    addUserAnswer(addUserAnswerArgs: AddUserAnswerArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
