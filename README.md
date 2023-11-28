# TOUCH-WAVE

1인 사이드 프로젝트

## 소개

- 출근알림, 도착알림, 기상알림 등 목적에 맞게 하루에 1번 버튼을 눌러 팀 단위로 서로의 알림을 받아볼 수 있는 사이트
- 종전 회사에서 시차출퇴근 & 유연근무제 운영으로 팀원 출근 시간대 확보 차원에서 혼자 생각했었던 아이디어를 구현시킨 것

### 작업 기간

- 2023.11.06 ~ 2023.11.26 (3주)

### 구현 스킬

#### front

- React, Typescript
- tailwind
- webpack

#### server

- firebase
- express (fcm 연동용)

#### deploy

- firebase

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
- firebase cloud messaging
  - 팀 알림발송
