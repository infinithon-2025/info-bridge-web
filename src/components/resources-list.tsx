import { useState } from 'react';
import styled from 'styled-components';
import Checkbox from './checkbox';

interface ResourceItem {
  id: string;
  label: string;
  href: string;
  checked?: boolean;
}

interface ResourcesListProps {
  resources?: ResourceItem[];
  onResourceChange?: (id: string, checked: boolean) => void;
}

const ResourcesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ResourceItemWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`;

const CheckboxWrapper = styled.div`
  cursor: pointer;
`;

const ResourceLabel = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  flex: 1;
  cursor: pointer;
  text-align: start;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: #6c757d;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #495057;
`;

const EmptyStateSubtext = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6c757d;
`;

export default function ResourcesList({
  resources,
  onResourceChange,
}: ResourcesListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    resources?.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.checked || false,
      }),
      {}
    ) || {}
  );

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked,
    }));
    onResourceChange?.(id, checked);
  };

  const handleLabelClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  if (!resources || resources?.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon>🔗</EmptyStateIcon>
        <EmptyStateText>링크가 없습니다</EmptyStateText>
        <EmptyStateSubtext>
          아래 추가 버튼을 눌러 참고할 링크를 추가해보세요
        </EmptyStateSubtext>
      </EmptyState>
    );
  }

  return (
    <ResourcesListWrapper>
      {resources.map(resource => (
        <ResourceItemWrapper key={resource.id}>
          <CheckboxWrapper
            onClick={() =>
              handleCheckboxChange(resource.id, !checkedItems[resource.id])
            }
          >
            <Checkbox
              checked={checkedItems[resource.id]}
              onChange={checked => handleCheckboxChange(resource.id, checked)}
              id={`resource-${resource.id}`}
            />
          </CheckboxWrapper>
          <ResourceLabel
            onClick={e => {
              e.preventDefault();
              handleLabelClick(resource.href);
            }}
            href={resource.href}
          >
            {resource.label}
          </ResourceLabel>
        </ResourceItemWrapper>
      ))}
    </ResourcesListWrapper>
  );
}
