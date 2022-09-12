### 프로젝트 
Create-react-app으로 기본 프로젝트 구성

```bash
├── node_modules
├── src
│   ├── components
│   │	├── AuthenForm.css
│   │	├── AuthenForm.tsx
│   │	├── CompletedForm.css
│   │	├── CompletedForm.tsx
│   │	├── TermsModal.css
│   │	├── TermsModal.tsx
│   │	├── Timer.css
│   │	└── Timer.tsx
│   ├── utils
│   │	├── request.module.ts
│   │	└── validationUtil.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── public
├── tsconfig.json
├── package-lock.json
└── package.json
```

총 3페이지 구성
1. 인증정보 입력 폼 AuthenForm
유효성 검사는 server/src/utils/validationUtil 를 이용함
2. 타이머 Timer
3. 인증 완료 CompletedForm

통신은 내장된 모듈인 fetch를 통해서 진행.
response type(interface)을 utils/request.module.ts 로 분리.

UI framework는 사용하지 않음

### 프로젝트 실행 방법
1.
`npm ci`
2.
`npm start` 