
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

export interface Survey {
    id: number;
    title: string;
    description: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    surveys(): Survey[] | Promise<Survey[]>;
    surveyById(serveyId: number): Survey | Promise<Survey>;
}

export interface IMutation {
    deleteSurvey(serveyId: number): string | Promise<string>;
    addSurvey(addSurveyArgs: AddSurveyArgs): string | Promise<string>;
    updateSurvey(updateSurveyArgs: UpdateSurveyArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
