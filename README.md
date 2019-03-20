## 결과 확인
https://calendar-kakao.netlify.com/ 에서 확인 가능합니다.


## How to install
```bash
npm install
```

## How to start on dev-server
```bash
npm start
```

## How to build
```bash
npm run build
npm install -g serve
```

## How to start from build
```bash
serve -s build -l 3000
```

#### 페이지 확인
위 `npm start` or 빌드 후 `serve -s build -l 3000`명령어로 프로젝트 실행 후, 
http://localhost:3000 에서 페이지 확인 가능

## 문제 해결 전략
- 다수의 사용자가 사용하는 것이 아니기 때문에 별도의 서버, DB 를 사용하지 않고, 브라우저의 localStorage 를 이용하여 일정 데이터 저장
- 월 달력: 각 월의 1일의 시작요일이 다르기 때문에 시작일을 기준으로 요일을 먼저 찾고, (1일 - 요일) 로 계산하여 캘린더에 처음 보여줄 날짜를 계산 
- 주 달력: 현재 날짜를 기준으로 월 달력의 첫째 날을 계산할 때와 마찬가지로 (현재일 - 요일)로 주 달력의 일자를 계산
- 기존에 생성된 일정을 수정할 때와, 새로 일정을 추가할 때 Dialog 의 버튼을 다르게 표시
- 새로 생성: 시작시간 = 현재시간, 종료시간 = 현재시간 + 1시간 으로 표시
- 기존 일정 수정: 기존에 생성되어 있던 일정으로 Dialog 표시


## 과제 조건 불이행
- 일정 상, 기능 구현에 초점을 두다보니 필수임에도 불구하고 Test code 는 작성하지 못함 
