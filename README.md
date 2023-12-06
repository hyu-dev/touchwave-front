# TOUCH-WAVE

1인 사이드 프로젝트
[https://touchwave.online](https://touchwave.online)

## 소개

- 출근알림, 도착알림, 기상알림 등 목적에 맞게 하루에 1번 버튼을 눌러 팀 단위로 서로의 알림을 받아볼 수 있는 사이트
- 종전 회사에서 시차출퇴근 & 유연근무제 운영으로 팀원 출근 시간대 확보 차원에서 혼자 생각했었던 아이디어를 구현시킨 것

### 작업 기간

- 2023.11.06 ~ 2023.12.06 (5주)

### 구현 스킬

#### front

- 코어: React, Typescript
- 스타일링: tailwind
- 상태관리: context api
- 빌드: webpack
- 배포: firebase
- cd: github actions

#### server

- 코어: express, nodejs
- 배포: cloudtype

### 기능 구현

- firebase authentication
  - 로그인, 로그아웃
  - 회원가입, 회원탈퇴 (hard)
  - 이메일 인증
  - 비밀번호 초기화 메일 발송
- firebase firestore
  - 회원가입 유저정보 데이터 생성
  - 유저정보 수정 (알림 받기 여부, 최근 이메일 발송 시간), 삭제
  - 팀 생성, 수정, 삭제
  - 알림 보낸 유저리스트 호출 (당일)
- firebase cloud messaging (express)
  - 팀 알림 발송

### 유의사항

- firebase 인증 메일 무료버전을 사용하여 24시간 기준 5개씩 이메일 인증을 보낼 수 있음
- (오늘 5명 회원가입 후 이메일 인증을 시도했다면 24시간 뒤에 이메일 인증 추가 시도 가능)
