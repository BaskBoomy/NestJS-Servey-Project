
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

export interface UpdateQuestionArgs {
    id: number;
    question: string;
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
}

export interface IQuery {
    index(): string | Promise<string>;
    surveys(): Survey[] | Promise<Survey[]>;
    surveyById(serveyId: number): Survey | Promise<Survey>;
    Questions(): Question[] | Promise<Question[]>;
    QuestionById(serveyId: number): Question | Promise<Question>;
}

export interface IMutation {
    deleteSurvey(serveyId: number): string | Promise<string>;
    addSurvey(addSurveyArgs: AddSurveyArgs): string | Promise<string>;
    updateSurvey(updateSurveyArgs: UpdateSurveyArgs): string | Promise<string>;
    deleteQuestion(serveyId: number): string | Promise<string>;
    addQuestion(addQuestionArgs: AddQuestionArgs): string | Promise<string>;
    updateQuestion(updateQuestionArgs: UpdateQuestionArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
