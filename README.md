
## **1. 브랜치 네이밍 규칙**
| 브랜치 유형 | 설명 | 예시 |
| --- | --- | --- |
| main | 배포 가능한 안정적인 코드가 존재하는 메인 브랜치 | `main` |
| develop | 개발자들이 작업한 기능(feature branch)을 병합하여 통합하는 개발 브랜치 | `develop` |
| feature | 새로운 기능 개발 시 생성하는 브랜치 | `feat/login-page`, `feat/main-page` |
| fix | 버그 수정 시 생성하는 브랜치 | `fix/login-error` |
| hotfix | 긴급하게 수정해야 하는 버그 발생 시 main에서 분기하여 작업 후 main과 develop에 병합 | `hotfix/login-error` |

<br />

## **2. 커밋 메시지 규칙**

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `design`: 코드 형식 변경 (코드 로직에 영향을 주지 않는 변경, 디자인)
- `refactor`: 코드 리팩토링
- `chore`: 빌드 프로세스 또는 보조 도구 변경

<br />

## **3. src 폴더 구조**

src/
├── app/                   # 페이지 및 레이아웃 구성
│   ├── layout.tsx         # 전체 앱 공통 레이아웃
│   ├── page.tsx           # 루트 페이지 (/)
│   ├── about/             # /about 페이지 경로
│   │   └── page.tsx
│   └── dashboard/
│       ├── layout.tsx     # /dashboard 이하 공통 레이아웃
│       └── page.tsx
├── components/            # 재사용 가능한 UI 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Button.tsx
├── styles/                # 글로벌 및 모듈 CSS
│   ├── globals.css
│   └── variables.css
├── lib/                   # API 호출, 헬퍼 함수, 외부 라이브러리 래퍼
│   ├── fetcher.ts
│   └── auth.ts
├── hooks/                 # 커스텀 React 훅
│   └── useUser.ts
├── constants/             # 상수 모음
│   └── routes.ts
└── types/                 # TypeScript 타입 정의
    └── user.d.ts
