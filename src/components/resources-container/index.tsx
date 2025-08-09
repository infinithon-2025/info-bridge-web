import styled from 'styled-components';
import Button from '../button';
import FlexBox from '../flex-box';
import Container from '../container';
import ResourcesList from '../resources-list';
import HR from '../hr';
import { FaPlus } from 'react-icons/fa';

const ResourcesWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 6px;
    border-radius: 6px;
  }
`;

const sampleResources = [
  {
    id: '1',
    label: 'React 공식 문서',
    href: 'https://react.dev',
    checked: false,
  },
  {
    id: '2',
    label: 'TypeScript 핸드북',
    href: 'https://www.typescriptlang.org/docs',
    checked: true,
  },
  {
    id: '3',
    label: 'styled-components 문서',
    href: 'https://styled-components.com/docs',
    checked: false,
  },
];

export default function ResourcesContainer() {
  const handleResourceChange = (id: string, checked: boolean) => {
    console.log(`Resource ${id} is now ${checked ? 'checked' : 'unchecked'}`);
  };

  return (
    <ResourcesWrapper>
      <FlexBox
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <p style={{ textAlign: 'start' }}>출처</p>
        </div>
        <HR height={1} margin="8px 0" />
        <ResourcesList
          resources={sampleResources}
          onResourceChange={handleResourceChange}
        />
        <Button variant="primary" title="추가" leftIcon={FaPlus} isFull />
      </FlexBox>
    </ResourcesWrapper>
  );
}
