import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Container from '../container';
import HR from '../hr';

const SummaryWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;

  @media (max-width: 480px) {
    border-radius: 6px;
  }
`;

const SummaryHeader = styled.div`
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  border: 16px solid #fff;
  border-bottom: none;
`;

const SummaryContent = styled.div`
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: start;
`;

const SummaryFooter = styled.div`
  padding: 5px;
  flex-shrink: 0;
  border-top: 1px solid #dee2e6;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const sampleResources = `## 📋 티켓 정보
**JIRA**: \`PROJ-1234 - 사용자 프로필 페이지 리뉴얼\`  
**우선순위**: High | **담당자**: 김개발 | **스프린트**: Sprint 23

## 📚 관련 문서 (Confluence)
- **UI/UX 가이드라인** (confluence/design-system)
- **API 문서 v2.1** (confluence/api-docs/user-profile)
- **보안 정책** (confluence/security/data-handling)

## 🔍 관련 Git 히스토리
- \`feat: user avatar upload\` (PR #456) - 프로필 이미지 업로드 기능
- \`fix: profile validation\` (PR #423) - 프로필 유효성 검사 버그 수정
- \`refactor: user service\` (PR #401) - 사용자 서비스 리팩토링

---

## 🎯 워크플로우 요약

### ✅ 해야 할 일:

**1. 환경 설정** (예상 시간: 30분)
- feature/PROJ-1234-profile-renewal 브랜치 생성
- 개발 환경에서 최신 API 문서 확인
- 디자인 시스템 컴포넌트 라이브러리 업데이트

**2. 프론트엔드 개발** (예상 시간: 2일)
- 기존 ProfilePage 컴포넌트 분석 및 백업
- 새로운 UI 컴포넌트 구현 (Avatar, ProfileForm, SettingsPanel)
- 프로필 이미지 업로드 기능 통합 (PR #456 참고)
- 반응형 디자인 적용

**3. 백엔드 연동** (예상 시간: 1일)
- User Profile API v2.1 엔드포인트 연동
- 프로필 유효성 검사 로직 구현 (PR #423 수정사항 반영)
- 데이터 보안 정책 준수 확인

**4. 테스트 및 QA** (예상 시간: 1일)
- 단위 테스트 작성 (ProfilePage.test.tsx)
- E2E 테스트 시나리오 작성
- 크로스 브라우저 테스트
- 접근성 테스트 (WCAG 2.1 AA 준수)

### ⚠️ 주의사항:
- 기존 사용자 데이터 마이그레이션 필요
- 프로필 이미지 용량 제한 (5MB) 확인
- GDPR 개인정보 처리 방침 준수

### 🔄 다음 단계:
- 완료 후 PROJ-1235 (프로필 공유 기능) 연계 개발 예정
`;

export default function SummaryContainer() {
  return (
    <SummaryWrapper>
      <SummaryHeader>
        <p style={{ margin: '0 0 8px 0', textAlign: 'start' }}>요약</p>
        <HR height={1} margin="0" />
      </SummaryHeader>

      <SummaryContent>
        {sampleResources ? (
          <ReactMarkdown>{sampleResources}</ReactMarkdown>
        ) : (
          <p>리소스가 없습니다.</p>
        )}
      </SummaryContent>

      <SummaryFooter>
        <p>last updated: {new Date().toLocaleDateString()}</p>
      </SummaryFooter>
    </SummaryWrapper>
  );
}
