import styled from 'styled-components';
import Button from '../button';
import Container from '../container';
import ResourcesList from '../resources-list';
import HR from '../hr';
import { FaPlus } from 'react-icons/fa';

const ResourcesWrapper = styled(Container)`
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

const ResourcesHeader = styled.div`
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  border: 16px solid #fff;
  border-bottom: none;
`;

const ResourcesContent = styled.div`
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ResourcesFooter = styled.div`
  padding: 16px;
  flex-shrink: 0;
  border-top: 1px solid #dee2e6;
  background-color: #fff;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const sampleResources = [
  {
    id: '1',
    type: 'jira',
    label: 'PROJ-1234 - 사용자 프로필 페이지 리뉴얼',
    href: 'https://jira.example.com/browse/PROJ-1234',
    checked: true,
  },
  {
    id: '2',
    type: 'confluence',
    label: 'UI/UX 가이드라인',
    href: 'https://confluence.example.com/display/design-system/UI/UX+가이드라인',
    checked: true,
  },
  {
    id: '3',
    type: 'git',
    label: 'feat: user avatar upload (PR #456)',
    href: 'https://github.com/example/repo/pull/456',
    checked: true,
  },
  {
    id: '4',
    type: 'slack',
    label: '프로필 페이지 리뉴얼 관련 논의',
    href: 'https://slack.example.com/archives/C1234567890/p1234567890',
    checked: true,
  },
];

export default function ResourcesContainer() {
  const handleResourceChange = (id: string, checked: boolean) => {
    console.log(`Resource ${id} is now ${checked ? 'checked' : 'unchecked'}`);
  };

  return (
    <ResourcesWrapper>
      <ResourcesHeader>
        <p style={{ margin: '0 0 8px 0', textAlign: 'start' }}>출처</p>
        <HR height={1} margin="0" />
      </ResourcesHeader>

      <ResourcesContent>
        <ResourcesList
          resources={sampleResources}
          onResourceChange={handleResourceChange}
        />
      </ResourcesContent>

      <ResourcesFooter>
        <Button variant="primary" title="추가" leftIcon={FaPlus} isFull />
      </ResourcesFooter>
    </ResourcesWrapper>
  );
}
