
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

export interface AddQuestionsWithAnswers {
    surveyId: number;
    questions: Questions[];
}

export interface Questions {
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
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Question {
    id: number;
    question: string;
    survey: Survey;
    answers: Answer[];
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Answer {
    id: number;
    answer: string;
    score: number;
    question: Question;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface User {
    id: number;
    name: string;
    phoneNumber: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface UserResultAnswers {
    question: Question;
    userAnswer: Answer[];
}

export interface UserAnswerResult {
    user: User;
    survey: Survey;
    answers: UserResultAnswers[];
    totalScore: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IQuery {
    index(): string | Promise<string>;
    surveys(): Survey[] | Promise<Survey[]>;
    surveyById(surveyId: number): Survey | Promise<Survey>;
    Questions(): Question[] | Promise<Question[]>;
    QuestionById(surveyId: number): Question | Promise<Question>;
    Answers(): Answer[] | Promise<Answer[]>;
    AnswerById(answerId: number): Answer | Promise<Answer>;
    userAnswersById(userId: number, surveyId: number): UserAnswerResult | Promise<UserAnswerResult>;
}

export interface IMutation {
    deleteSurvey(surveyId: number): string | Promise<string>;
    addSurvey(addSurveyArgs: AddSurveyArgs): string | Promise<string>;
    updateSurvey(updateSurveyArgs: UpdateSurveyArgs): string | Promise<string>;
    deleteQuestion(surveyId: number): string | Promise<string>;
    addQuestion(addQuestionArgs: AddQuestionArgs): string | Promise<string>;
    addQuestionsWithAnswers(addQuestionsWithAnsersArgs: AddQuestionsWithAnswers): string | Promise<string>;
    updateQuestion(updateQuestionArgs: UpdateQuestionArgs): string | Promise<string>;
    deleteAnswer(answerId: number): string | Promise<string>;
    addAnswer(addAnswerArgs: AddAnswerArgs): string | Promise<string>;
    updateAnswer(updateAnswerArgs: UpdateAnswerArgs): string | Promise<string>;
    submitSurvey(addUserAnswerArgs: AddUserAnswerArgs): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;
