import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../button';
import Container from '../container';
import HR from '../hr';
import { FaPlus } from 'react-icons/fa';
import RecommendationList from './recommendation-list';
import {
  LinkItemDto,
  ToggleFixedResponseDto,
} from '../../types/dto/projects.dto';
import RecommendationListSkeleton from '../skeleton/recommendation-skeleton';
import { useToggleFixed } from '../../hooks/projects/use-projects';

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
  text-align: start;
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

const sampleRecommendation: LinkItemDto[] = [
  {
    id: 1,
    channelName: 'github',
    isActive: true,
    isFixed: false,
    projectName: 'Sample Project',
    createdAt: '2025-01-01T00:00:00Z',
    materialType: 'git',
    link: 'https://github.com/example/repo/pull/456',
    title: 'feat: user avatar upload (PR #456) - 프로필 이미지 업로드 기능',
    body: 'Profile image upload feature implementation',
    originCreatedAt: '2025-01-01T00:00:00Z',
    originUpdatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 2,
    channelName: 'github',
    isActive: true,
    isFixed: false,
    projectName: 'Sample Project',
    createdAt: '2025-01-01T00:00:00Z',
    materialType: 'git',
    link: 'https://github.com/example/repo/pull/423',
    title: 'fix: profile validation (PR #423) - 프로필 유효성 검사 버그 수정',
    body: 'Profile validation bug fix',
    originCreatedAt: '2025-01-01T00:00:00Z',
    originUpdatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 3,
    channelName: 'confluence',
    isActive: true,
    isFixed: false,
    projectName: 'Sample Project',
    createdAt: '2025-01-01T00:00:00Z',
    materialType: 'confluence',
    link: 'https://confluence.example.com/display/design-system/Design+System+Guidelines+v2.3',
    title: '디자인 시스템 가이드 - Design System Guidelines v2.3',
    body: 'Design system guidelines and documentation',
    originCreatedAt: '2025-01-01T00:00:00Z',
    originUpdatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 4,
    channelName: 'confluence',
    isActive: true,
    isFixed: false,
    projectName: 'Sample Project',
    createdAt: '2025-01-01T00:00:00Z',
    materialType: 'confluence',
    link: 'https://confluence.example.com/display/api-docs/User+Profile+API+Documentation',
    title: 'API 문서 v2.1 - User Profile API Documentation',
    body: 'API documentation for user profile endpoints',
    originCreatedAt: '2025-01-01T00:00:00Z',
    originUpdatedAt: '2025-01-01T00:00:00Z',
  },
];

interface RecommendationContainerProps {
  recommendations?: LinkItemDto[];
  loading?: boolean;
  error?: string | null;
  onItemsToggled?: (toggledItems: ToggleFixedResponseDto[]) => void;
  onSummaryRefresh?: () => void;
}

const transformToRecommendationFormat = (recommendations: LinkItemDto[]) => {
  return recommendations.map(rec => ({
    id: rec.id.toString(),
    type: rec.materialType,
    label: rec.title || rec.body || 'Untitled',
    href: rec.link,
    checked: rec.isFixed && rec.isActive,
  }));
};

export default function RecommendationContainer({
  recommendations = [],
  loading = false,
  error = null,
  onItemsToggled,
  onSummaryRefresh,
}: RecommendationContainerProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { toggleMultipleFixed, loading: toggleLoading } = useToggleFixed();

  const handleResourceChange = (id: string, checked: boolean) => {
    console.log('handleResourceChange called:', { id, checked });
    setSelectedItems(prev => {
      const newSelection = new Set(prev);
      if (checked) {
        newSelection.add(id);
        console.log('Added to selection:', id, 'new size:', newSelection.size);
      } else {
        newSelection.delete(id);
        console.log(
          'Removed from selection:',
          id,
          'new size:',
          newSelection.size
        );
      }
      console.log('New selection set:', Array.from(newSelection));
      return newSelection;
    });
  };

  const handleAddSelected = useCallback(async () => {
    console.log('handleAddSelected called, selectedItems:', selectedItems);

    if (selectedItems.size === 0) {
      return;
    }

    try {
      // Get item IDs from recommendations data
      const itemIds: number[] = [];

      // Handle paginated recommendation response
      const recommendationList = Array.isArray(recommendations)
        ? recommendations
        : recommendations || [];

      recommendationList.forEach(rec => {
        if (selectedItems.has(rec.id.toString())) {
          // Check if it's RecommendationItemDto (has 'item' field) or RecommendationDto (only has 'id')
          const itemId = rec.id;
          itemIds.push(itemId);
        }
      });

      console.log('Final itemIds to toggle:', itemIds);

      if (itemIds.length === 0) {
        return;
      }

      // Call toggle fixed API for all selected items
      const toggledItems = await toggleMultipleFixed(itemIds);
      console.log('Toggle result:', toggledItems);

      // Notify parent component about toggled items
      if (onItemsToggled) {
        onItemsToggled(toggledItems);
      }

      // Clear selection
      setSelectedItems(new Set());

      // Trigger summary refresh
      if (onSummaryRefresh) {
        onSummaryRefresh();
      }
    } catch (error) {
      console.error('Failed to toggle items:', error);
    }
  }, [
    selectedItems,
    recommendations,
    toggleMultipleFixed,
    onItemsToggled,
    onSummaryRefresh,
  ]);

  const recommendationData = React.useMemo(() => {
    const data = recommendations;

    // Transform to the format expected by RecommendationList component
    return transformToRecommendationFormat(data).map(item => ({
      ...item,
      checked: selectedItems.has(item.id),
    }));
  }, [recommendations, selectedItems]);

  if (error) {
    return (
      <RecommendationWrapper>
        <RecommendationHeader>
          <p style={{ margin: '0 0 8px 0', textAlign: 'start' }}>추천</p>
          <HR height={1} margin="0" />
        </RecommendationHeader>
        <RecommendationContent>
          <div style={{ padding: '16px', textAlign: 'center', color: 'red' }}>
            Error: {error}
          </div>
        </RecommendationContent>
      </RecommendationWrapper>
    );
  }

  return (
    <RecommendationWrapper>
      <RecommendationHeader>
        <p style={{ margin: '0 0 8px 0', textAlign: 'start' }}>추천</p>
        <HR height={1} margin="0" />
      </RecommendationHeader>

      <RecommendationContent>
        {loading ? (
          <RecommendationListSkeleton />
        ) : (
          <RecommendationList
            recommendations={recommendationData}
            onRecommendationChange={handleResourceChange}
          />
        )}
      </RecommendationContent>

      {recommendationData.length > 0 && (
        <RecommendationFooter>
          <Button
            variant="primary"
            title={
              selectedItems.size > 0
                ? `추천 리소스 추가 (${selectedItems.size})`
                : '추천 리소스 추가'
            }
            leftIcon={FaPlus}
            isFull
            onClick={() => {
              console.log('Button clicked!');
              handleAddSelected();
            }}
            disabled={selectedItems.size === 0 || toggleLoading}
          />
        </RecommendationFooter>
      )}
    </RecommendationWrapper>
  );
}
