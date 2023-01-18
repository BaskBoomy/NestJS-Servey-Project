<!-- PROJECT LOGO -->
<br />

<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/5810/5810357.png" title="survey icons"  width="200" height="200" style="margin-left:50px"">
</div>

  <h3 align="center">Survey-BackEnd-Project</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>




<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

객관식 설문지에 필요한 API

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<img src="https://img.shields.io/badge/Nest.js-red?style=flat&logo=Nest.js&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/typeorm-9cf?style=flat&logo=typeorm&logoColor=white"/> <img src="https://img.shields.io/badge/Graphql-pink?style=flat&logo=graphql&logoColor=white"/> <img src="https://img.shields.io/badge/postgresql-blue?style=flat&logo=postgresql&logoColor=white"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Table Design



###### 

### Usage Of APIS

1. 설문지

   - **addSurvey** : 설문지의 제목과 설명을 입력하여 설문지를 추가한다.

     ```
     mutation AddSurvey($addSurveyArgs: AddSurveyArgs!) {
       addSurvey(addSurveyArgs: $addSurveyArgs)
     }
     ```

     ```
     {
       "addSurveyArgs": {
         "title": "<설문지 제목>",
         "description": "<설문지에 대한 설명을 입력해주시기 바랍니다.>" 
       }
     }
     ```

   - **surveys** :  모든 설문지에 대한 정보(질문, 답안)을 확인할 수 있다.

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

   - **surveyById** : 특정 설문지에 대한 정보(질문, 답안)만을 확인하기 위한 query

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

   - **deleteSurvey** : 설문지 삭제

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

   - **updateSurvey** : 설문지 수정

     - input : 설문지id, 설문지 제목, 세부 내용
     - output : 설문지 수정 성공 여부

     ```
     mutation UpdateSurvey($updateSurveyArgs: UpdateSurveyArgs!) {
       updateSurvey(updateSurveyArgs: $updateSurveyArgs)
     }
     ```

     ```
     {
       "updateSurveyArgs": {
         "id":<설문지id>,
         "title": "<현재 이 설문지는 업데이트되었습니다(1회)>",
         "description": "<이 설문지는 테스트를 위한 설문지 입니다.>" 
       }
     }
     ```

​				[이하, 각 colum에 해당하는 데이터를 crud하는 작업은 동일하므로 생략]

2. 질문

   - **addQuestionWithAnswers** :질문과 답안을 함께 추가할 경우

     - input : 설문지id, 질문 내용, 답안들
     - output : 질문 저장 성공 여부

     참고) 답안만 추가할 경우 'addQuestion' mutaion 사용

     ```
     mutation AddQuestionWithAnswers($args:AddQuestionWithAnswers!){
       addQuestionWithAnswers(addQuestionWithAnsersArgs:$args)
     }
     ```

     ```
     {
       "args": {
         "surveyId": <설문지id>,
         "question": "<질문>",
         "answers":[
           {"answer": "<답안 ex)기간>","score":1},
           {"answer": "<답안 ex)비용>","score":2},
           {"answer": "<답안 ex)치안>","score":3},
           {"answer": "<답안 ex)여행목적>","score":4},
           {"answer": "<답안 ex)음식>","score":5},
           {"answer": "<답안 ex)쇼핑>","score":6}
         ]
       }
     }
     ```

3. 답안

   - **addAnswer** : 답안 개별 추가

     - input : 질문id, 답안, 점수
     - output : 답안 저장 성공 여부

     ```
     mutation AddAnswer($arg: AddAnswerArgs!){
       addAnswer(addAnswerArgs:$arg)
     }
     ```

     ```
     {
     	"arg":{
         "questionId":>질문id>,
         "answer":"<답안>",
         "score":2
       }
     }
     ```

4. 설문지 완료

   - **submitSurvey** : 설문지 제출

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

   - 



 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

최종혁 - [Notion](https://www.notion.so/jonghyeok-choi/5ca12bf9fb134fa5a5a90a51526bbde0)  [E-mail](whdgurtpqms@naver.com)

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


