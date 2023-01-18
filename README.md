<!-- PROJECT LOGO -->
<br />

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/5810/5810357.png" title="survey icons"  width="200" height="200" style="margin-left:50px"">
</div>

  <h3 align="center">Survey-BackEnd-Project</h3>


<!-- ABOUT THE PROJECT -->
## About The Project

[ **객관식 설문지에 필요한 API 구현** ]

- user, survey, question, answer별로 모듈화

- 설문지 모두 조회 / 특정 설문지 조회
- 해당 설문지에 답안을 포함한 문항 추가
- 설문지 제출 후, 설문지와 사용자가 체크한 답안과 총점 확인 가능

## Built With

<img src="https://img.shields.io/badge/Nest.js-red?style=flat&logo=Nest.js&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/typeorm-9cf?style=flat&logo=typeorm&logoColor=white"/> <img src="https://img.shields.io/badge/Graphql-pink?style=flat&logo=graphql&logoColor=white"/> <img src="https://img.shields.io/badge/postgresql-blue?style=flat&logo=postgresql&logoColor=white"/>

## Table Design

![survey diagram](https://user-images.githubusercontent.com/57517612/213120082-08bd1fb5-abb2-44f6-8535-b7b602559a2c.PNG)

## Getting Started

### Prerequisites

1. [postgresql 설치](https://www.postgresql.org/download/)

2. npm (version >= 8.19.2)

   ```sh
   npm install npm@latest -g
   ```

### Installation

1. repository 복제
   ```sh
   git clone https://github.com/BaskBoomy/NestJS-Servey-Project.git
   ```
2. 해당 repository로 이동
   ```sh
   cd NestJS-Servey-Project
   ```
3. npm packages 설치

   ```sh
   npm install
   ```

4. Root 폴더에  `.env.dev` 파일 생성

5. `.env.dev` 파일에 postgresql connection 값 입력

   ```sh
   DB_HOST=
   DB_PORT=
   DB_USERNAME=
   DB_PASSWORD=
   DB_NAME=
   ```

   ​	

### Usage Of APIS

1. #### 설문지

   - **[addSurvey](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/survey/survey.service.ts#L50-L61)** : 설문지의 제목과 설명을 입력하여 설문지를 추가한다.

     ```
     mutation AddSurvey($args: AddSurveyArgs!) {
       addSurvey(addSurveyArgs: $addSurveyArgs)
     }
     ```

     ```
     {
       "args": {
         "title": "<설문지 제목>",
         "description": "<설문지에 대한 설명을 입력해주시기 바랍니다.>" 
       }
     }
     ```

   - **[surveys](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/survey/survey.service.ts#L13-L21)** :  모든 설문지에 대한 정보(질문, 답안)을 확인할 수 있다.

     ```
     {
       surveys{
         id
         title
         description
         questions{
           question
           answers{
             answer
             score
           }
         }
       }
     }
     ```

   - **[surveyById](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/survey/survey.service.ts#L23-L35)** : 특정 설문지에 대한 정보(질문, 답안)만을 확인하기 위한 query

     ```
     {
       surveyById(surveyId:<설문지id>){
         id
         title
         description
         questions{
           question
           answers{
             id
             answer
           }
         }
       }
     }
     ```

   - **[deleteSurvey](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/survey/survey.service.ts#L37-L48)** : 설문지 삭제

     - input : 설문지id
     - output : 설문지 삭제 성공 여부

     ```
     mutation DeleteSurvey($surveyId: Int!) {
       deleteSurvey(surveyId:$surveyId)
     }
     ```

     ```
     {
       "surveyId":<설문지id>
     }
     ```

   - **[update Survey](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/survey/survey.service.ts#L63-L77)** : 설문지 수정

     - input : 설문지id, 설문지 제목, 세부 내용
     - output : 설문지 수정 성공 여부

     ```
     mutation UpdateSurvey($args: UpdateSurveyArgs!) {
       updateSurvey(updateSurveyArgs: $updateSurveyArgs)
     }
     ```

     ```
     {
       "args": {
         "id":<설문지id>,
         "title": "<현재 이 설문지는 업데이트되었습니다(1회)>",
         "description": "<이 설문지는 테스트를 위한 설문지 입니다.>" 
       }
     }
     ```

		

2. #### 질문

   - **[addQuestionsWithAnswers](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/question/question.service.ts#L76-L107)** : 질문들과 그에 해당하는 답안들을 함께 추가할 경우

     - input : 설문지id, 질문 내용들, 답안들
     - output : 질문 저장 성공 여부

     참고) 질문만 추가할 경우 '**[addQuestion](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/question/question.service.ts#L59-L74)**' mutaion 사용

     ```
     mutation AddQuestionsWithAnswers($args:AddQuestionsWithAnswers!){
       addQuestionsWithAnswers(addQuestionsWithAnsersArgs:$args)
     }
     ```

     ```
     {
       "args": {
         "surveyId": <설문지ID>,
         "questions":[
           {
             "question": "<질문>",
             "answers":[
               {"answer": "<답변1>","score":<점수>},
               ...
             ]
           },
           ...
         ]
       }
     }
     ```

3. #### 답안

   - **[addAnswer](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/answer/answer.service.ts#L52-L68)** : 답안 개별 추가

     - input : 질문id, 답안, 점수
     - output : 답안 저장 성공 여부

     ```
     mutation AddAnswer($args: AddAnswerArgs!){
       addAnswer(addAnswerArgs:$arg)
     }
     ```

     ```
     {
       "args":{
         "questionId":>질문id>,
         "answer":"<답안>",
         "score":2
       }
     }
     ```

4. #### 설문지 완료

   - **[submitSurvey](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/user/answer/userAnswer.service.ts#L78-L108)** : 설문지 제출

     ```
     mutation SubmitSurvey($args: AddUserAnswerArgs!){
       submitSurvey(addUserAnswerArgs:$args)
     }
     ```

     ```
     {
       "args":{
         "userId":<사용자id>,
         "surveyId":<설문지id>,
         "answers":[
           {"questionId":<질문id>,"answerId":<답안id>},
           {"questionId":<질문id>,"answerId":<답안id>},
           {"questionId":<질문id>,"answerId":<답안id>},
           {"questionId":<질문id>,"answerId":<답안id>},
           {"questionId":<질문id>,"answerId":<답안id>}
           ...
         ]
       }
     }
     ```

   - **[userAnswersById](https://github.com/BaskBoomy/NestJS-Servey-Project/blob/39d6a4d3adc014656da332efe5d484c9bef9ecb2/src/user/answer/userAnswer.service.ts#L24-L76)** : 제출한 설문지 확인

     ```
     {
       userAnswersById(userId:<사용자id>,surveyId:<설문지id>){
         user{
           id
           name
           phoneNumber
         }
         survey{
           id
           title
           description
         }
         answers{
           question{
             question
             answers{
               id
               answer
             }
           }
           userAnswer{
             id
             answer
             score
           }
         }
         totalScore
       }
     }
     ```

## Contact

최종혁 - [Notion](https://www.notion.so/jonghyeok-choi/5ca12bf9fb134fa5a5a90a51526bbde0)  [E-mail](whdgurtpqms@naver.com)

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)
