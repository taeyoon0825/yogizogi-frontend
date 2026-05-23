# 🧳 YogiZogi - 여행기 커뮤니티 플랫폼

<div align="center">

여행의 순간을 기록하고, 지도에서 맛집과 관광지를 찾아보며,  
함께 여행 준비물을 관리할 수 있는 여행기 커뮤니티 서비스


</div>

## 📋 목차
- 프로젝트 소개
- 프로젝트 핵심 가치
- 프로젝트 성과
- 주요 기능
- 기술 스택
- 아키텍처
- 핵심 구현 사항
- 프로젝트 구조
- 실행 방법
- 개선 사항 및 학습 포인트
- 향후 개선 계획

---

## 🎯 프로젝트 소개

YogiZogi는 사용자가 여행기를 작성하고 공유할 수 있는 여행기 커뮤니티 플랫폼입니다.  
사용자는 여행 사진, 여행지, 여행 기간, 태그, 본문을 포함한 여행기를 작성할 수 있으며,  
다른 사용자의 여행기를 조회하고 좋아요, 댓글, 답글, 태그 기능을 통해 소통할 수 있습니다.

또한 카카오맵 기반으로 주변 맛집과 관광지를 탐색할 수 있고,  
공용 체크리스트 기능을 통해 여행 전 준비물을 함께 관리할 수 있습니다.

---

## 💡 프로젝트 핵심 가치

**여행 기록 공유**  
- 여행 사진과 글을 기반으로 개인의 여행 경험을 커뮤니티에 공유

**지도 기반 탐색**  
- 카카오맵을 활용해 주변 맛집과 관광지를 시각적으로 탐색

**소셜 커뮤니케이션**  
- 좋아요, 댓글, 답글, 태그를 통해 사용자 간 상호작용 제공

**여행 준비 협업**  
- 공용 체크리스트로 준비물, 담당자, 수량, 완료 여부 관리

**인증 기반 서비스 흐름**  
- 로그인/회원가입 이후 여행기 작성, 체크리스트 등 주요 기능 사용

---

## 📊 프로젝트 성과

- React + Vite 기반 SPA 프론트엔드 구조 설계
- React Router 기반 다중 페이지 라우팅 구성
- 여행기 목록/상세/작성 화면 구현
- 이미지 및 썸네일 업로드를 위한 FormData 처리 구현
- JWT Access Token 저장 및 Refresh Token 기반 재발급 흐름 구현
- 카카오맵 API 연동을 통한 지도 기반 장소 탐색 기능 구현
- 댓글/답글/좋아요/태그 등 커뮤니티 상호작용 기능 구현
- 공용 체크리스트 목록/상세/생성 흐름 구현
- Vite Proxy 설정을 통한 백엔드 API 연동 환경 구성

---

## ✨ 주요 기능

### 1️⃣ 여행기 커뮤니티

- 여행기 목록 조회
- 커서 기반 더보기 페이지네이션
- 여행기 상세 조회
- 여행기 추천 목록 표시
- 태그 기반 여행기 정보 제공

### 2️⃣ 여행기 작성

- 제목, 여행지, 여행 기간 입력
- 본문 작성
- 태그 입력
- 썸네일 이미지 업로드
- 여행 사진 최대 6장 업로드
- 댓글 허용 여부 설정
- 작성 완료 후 상세 페이지 이동

### 3️⃣ 소셜 기능

- 게시글 좋아요 등록/취소
- 좋아요 수 표시
- 댓글 작성
- 대댓글 작성
- 댓글 목록 조회
- 게시글 태그 추가/삭제
- 추천 여행기 표시

### 4️⃣ 지도 기반 장소 탐색

- 카카오맵 API 연동
- 현재 기준 주변 맛집/관광지 데이터 조회
- 맛집/관광지/전체 필터링
- 지도 마커 표시
- 마커 클릭 시 장소 상세 정보 표시
- 줌 레벨에 따른 마커 표시 제어

### 5️⃣ 공용 체크리스트

- 체크리스트 목록 조회
- 체크리스트 생성
- 체크리스트 상세 조회
- 준비물 추가
- 담당자 및 수량 입력
- 준비물 완료/미완료 상태 변경
- 팀 멤버 표시
- 체크리스트 나가기 UI 제공

### 6️⃣ 인증 기능

- 이메일/비밀번호 로그인
- 회원가입
- 닉네임 및 프로필 URL 입력
- Access Token 저장
- Refresh Token 기반 Access Token 재발급
- 로그아웃
- 인증 상태에 따른 페이지 접근 제어

---

## 🛠 기술 스택

### Frontend

- Framework: React 19
- Build Tool: Vite
- Routing: React Router DOM
- Styling: Tailwind CSS
- UI Component: Radix UI
- Icon: lucide-react
- Form: React Hook Form
- Validation: Zod
- Chart: Recharts

### API / Auth

- Fetch API 기반 통신
- JWT Access Token
- Refresh Token 재발급 처리
- LocalStorage 기반 Access Token 관리
- Credentials Include 설정을 통한 쿠키 기반 인증 연동

### Map

- Kakao Map JavaScript SDK
- Marker
- MarkerClusterer
- 장소 타입 필터링

### Dev Environment

- Node.js
- npm
- Vite Dev Server
- Vite Proxy

---

## 🏗 아키텍처

```txt
┌─────────────────────┐
│       React App      │
│  React Router 기반 SPA │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│        Pages         │
│ Home / Write / Map   │
│ PostDetail / Profile │
│ Checklist / Auth     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     API Layer        │
│ auth / posts /       │
│ comments / checklist │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Vite Proxy        │
│ /api → Backend       │
│ /uploads → Backend   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Backend API     │
│  Auth / Posts / Map  │
│  Comments / Checklist│
└─────────────────────┘
주요 설계 방식
Page 기반 구조: 화면 단위로 페이지 컴포넌트 분리
API 모듈 분리: 인증, 댓글, 관광지, 체크리스트 API 분리
공통 API Client: Access Token 자동 첨부 및 401 응답 시 토큰 재발급 처리
Protected Flow: 인증이 필요한 페이지에서 로그인 여부 확인 후 이동 처리
Component Reuse: Button, Card 등 공용 UI 컴포넌트 활용
🔥 핵심 구현 사항
1. Access Token 자동 첨부 및 Refresh 처리
export async function apiFetch(input, init = {}) {
  const headers = new Headers(init.headers || {})
  const token = getAccessToken()

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const res = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
  })

  if (res.status !== 401) return res

  const newToken = await refreshAccessToken()
  if (!newToken) return res

  const retryHeaders = new Headers(init.headers || {})
  retryHeaders.set("Authorization", `Bearer ${newToken}`)

  return fetch(input, {
    ...init,
    headers: retryHeaders,
    credentials: "include",
  })
}
포인트
Access Token을 LocalStorage에 저장
API 요청 시 Authorization Header 자동 추가
401 응답 발생 시 Refresh Token으로 Access Token 재발급
재발급 성공 시 기존 요청 재시도
로그인/회원가입/로그아웃/토큰 재발급 API는 재시도 대상에서 제외
2. 여행기 목록 조회 및 커서 기반 페이지네이션
const loadPosts = async (cursor = null) => {
  const query = new URLSearchParams()
  query.append("limit", "12")

  if (cursor) {
    query.append("cursor", cursor)
  }

  const res = await fetch(`/api/posts?${query.toString()}`)
  const json = await res.json()

  const mapped = (json.data || []).map((p) => ({
    id: p.id,
    title: p.title,
    author: p.author_name || "작성자",
    location: p.region || "한국",
    likes: p.like_count ?? 0,
    comments: p.comment_count ?? 0,
    image:
      p.thumbnail_url ||
      (p.images && p.images[0] && p.images[0].image_url) ||
      "/placeholder.svg",
    tags: (p.tags || []).map((t) => `#${t.name}`),
    date: p.created_at
      ? new Date(p.created_at).toLocaleDateString("ko-KR")
      : "",
  }))

  if (cursor === null) {
    setPosts(mapped)
  } else {
    setPosts((prevPosts) => [...prevPosts, ...mapped])
  }

  setHasNextPage(json.cursorPagination?.hasNextPage ?? false)
  setNextCursor(json.cursorPagination?.nextCursor ?? null)
}
포인트
limit=12 기준 게시글 목록 조회
cursor가 없으면 초기 목록, cursor가 있으면 기존 목록에 추가
백엔드 응답 데이터를 프론트 화면 구조에 맞게 매핑
hasNextPage, nextCursor 값으로 더보기 버튼 제어
3. FormData 기반 여행기 작성
const form = new FormData()

form.append("author_id", "1")
form.append("title", title)
form.append("content", content)
form.append("region", location)
form.append("tags", JSON.stringify(tags))
form.append("allow_comments", String(allowComments))

if (thumbnailFile) {
  form.append("thumbnail", thumbnailFile)
}

for (const file of images) {
  form.append("images", file)
}

const json = await apiJson("/api/posts", {
  method: "POST",
  body: form,
})
포인트
썸네일과 다중 이미지를 함께 업로드
일반 JSON이 아닌 FormData로 게시글 작성 요청 처리
이미지 미리보기 URL 생성 및 메모리 해제 처리
작성 완료 후 생성된 게시글 상세 페이지로 이동
4. 카카오맵 기반 맛집/관광지 탐색
const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY

script.src =
  `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}` +
  `&autoload=false&libraries=services,clusterer`

const map = new window.kakao.maps.Map(container, {
  center: new window.kakao.maps.LatLng(37.5665, 126.978),
  level: zoomLevel,
})

const clusterer = new window.kakao.maps.MarkerClusterer({
  map,
  averageCenter: true,
  minLevel: 4,
})
포인트
.env에서 카카오맵 API 키 관리
지도 SDK 동적 로딩
맛집/관광지 데이터를 백엔드 API를 통해 조회
장소 타입에 따라 마커 색상 구분
MarkerClusterer로 다수 마커 관리
줌 레벨에 따라 마커 노출 제어
5. 댓글/답글 재귀 렌더링
const CommentItem = ({ comment }) => {
  return (
    <div>
      <p>{comment.content}</p>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 border-l-2 pl-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  )
}
포인트
댓글과 대댓글을 동일 컴포넌트로 재귀 렌더링
답글 작성 대상 댓글 ID 관리
답글 등록 후 댓글 목록 재조회
댓글 작성/답글 작성 API 분리
6. 공용 체크리스트 관리
export async function addChecklistItem(
  checklistId,
  { name, assignedTo, quantity }
) {
  return apiJson(`/api/checklists/${checklistId}/items`, {
    method: "POST",
    body: JSON.stringify({
      name,
      assignedTo: assignedTo || null,
      quantity: quantity ?? 1,
    }),
  })
}
포인트
체크리스트별 준비물 관리
담당자와 수량 입력 가능
준비물 완료 상태 변경
체크리스트 목록/상세/생성 API 분리
여행 준비 협업 기능으로 확장 가능
📁 프로젝트 구조
src
├── api
│   ├── attractions.js
│   ├── auth.js
│   ├── checklists.js
│   ├── client.js
│   └── comments.js
│
├── components
│   ├── ui
│   ├── logout-button.jsx
│   └── theme-provider.jsx
│
├── hooks
│   └── useAuthStatus.js
│
├── lib
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Write.jsx
│   ├── Map.jsx
│   ├── PostDetail.jsx
│   ├── Profile.jsx
│   ├── ProfileEdit.jsx
│   ├── Checklist.jsx
│   ├── ChecklistCreate.jsx
│   ├── ChecklistDetail.jsx
│   └── ForgotPassword.jsx
│
├── App.jsx
├── index.css
└── main.jsx
🚀 실행 방법
사전 요구사항
Node.js 18 이상 권장
npm
백엔드 API 서버 실행 필요
Kakao Map JavaScript API Key 필요
환경 변수 설정

프로젝트 루트에 .env 파일을 생성합니다.

VITE_API_TARGET=http://localhost:9090
VITE_KAKAO_MAP_KEY=your_kakao_map_javascript_key
설치 및 실행
# 프로젝트 클론
git clone https://github.com/taeyoon0825/yogizogi-frontend.git

# 프로젝트 이동
cd yogizogi-frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
접속
http://localhost:5173
빌드
npm run build
빌드 결과 미리보기
npm run preview
📈 개선 사항 및 학습 포인트
구현하면서 배운 것들

1. React SPA 라우팅 구조 설계

React Router를 활용한 페이지 라우팅
Home, Write, Detail, Map, Checklist 등 기능별 페이지 분리
인증 상태에 따른 페이지 접근 제어

2. 인증 API 연동

Access Token 저장 및 요청 Header 자동 첨부
Refresh Token을 통한 Access Token 재발급
로그아웃 시 토큰 제거 및 인증 상태 갱신

3. 파일 업로드 처리

FormData 기반 이미지 업로드
썸네일 이미지와 본문 이미지를 분리 관리
업로드 전 이미지 미리보기 구현

4. 지도 API 연동

외부 Kakao Map SDK 동적 로딩
지도 마커 및 클러스터링 적용
맛집/관광지 필터링 UI 구현

5. 커뮤니티 기능 구현

좋아요 상태 변경
댓글/답글 작성
태그 추가/삭제
추천 게시글 표시

6. 협업 기능 확장

공용 체크리스트 목록/상세 구조 구현
준비물 담당자, 수량, 완료 상태 관리
여행 준비 협업 기능의 기반 설계
🔧 향후 개선 계획
실제 로그인 사용자 ID 기반 여행기 작성 처리
체크리스트 항목 추가/수정/삭제 API 완전 연동
공용 체크리스트 공유 링크 기능 구현
알림 기능 백엔드 연동
게시글 검색 기능 고도화
인기/최신/태그별 필터링 기능 추가
지도 현재 위치 기반 검색 기능 추가
여행기 이미지 드래그 앤 드롭 업로드 개선
반응형 UI 디테일 개선
API 에러 처리 공통화
로딩/스켈레톤 UI 적용
배포 환경 설정 및 CI/CD 구성