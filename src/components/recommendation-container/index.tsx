import styled from 'styled-components';
import Button from '../button';
import Container from '../container';
import HR from '../hr';
import { FaPlus } from 'react-icons/fa';
import RecommendationList from './recommendation-list';

const RecommendationWrapper = styled(Container)`
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

const RecommendationHeader = styled.div`
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  border: 16px solid #fff;
  border-bottom: none;
`;

const RecommendationContent = styled.div`
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const RecommendationFooter = styled.div`
  padding: 16px;
  flex-shrink: 0;
  border-top: 1px solid #dee2e6;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const sampleRecommendation = [
  {
    id: '1',
    type: 'git',
    label: 'feat: user avatar upload (PR #456) - 프로필 이미지 업로드 기능',
    href: 'https://github.com/example/repo/pull/456',
    checked: false,
  },
  {
    id: '2',
    type: 'git',
    label: 'fix: profile validation (PR #423) - 프로필 유효성 검사 버그 수정',
    href: 'https://github.com/example/repo/pull/423',
    checked: false,
  },
  {
    id: '3',
    type: 'git',
    label: 'feat: user avatar upload (PR #456)',
    href: 'https://github.com/example/repo/pull/456',
    checked: false,
  },
  {
    id: '4',
    type: 'confluence',
    label: '디자인 시스템 가이드 - Design System Guidelines v2.3',
    href: 'https://confluence.example.com/display/design-system/Design+System+Guidelines+v2.3',
    checked: false,
  },
  {
    id: '5',
    type: 'confluence',
    label: 'API 문서 v2.1 - User Profile API Documentation',
    href: 'https://confluence.example.com/display/api-docs/User+Profile+API+Documentation',
    checked: false,
  },
];

export default function RecommendationContainer() {
  const handleResourceChange = (id: string, checked: boolean) => {
    console.log(`Resource ${id} is now ${checked ? 'checked' : 'unchecked'}`);
  };

  return (
    <RecommendationWrapper>
      <RecommendationHeader>
        <p style={{ margin: '0 0 8px 0', textAlign: 'start' }}>추천</p>
        <HR height={1} margin="0" />
      </RecommendationHeader>

      <RecommendationContent>
        <RecommendationList
          recommendations={sampleRecommendation}
          onRecommendationChange={handleResourceChange}
        />
      </RecommendationContent>

      <RecommendationFooter>
        <Button variant="primary" title="추가" leftIcon={FaPlus} isFull />
      </RecommendationFooter>
    </RecommendationWrapper>
  );
}
