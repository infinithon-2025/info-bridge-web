import {
  ResourceItemSkeleton,
  ResourceIconSkeleton,
  ResourceContentSkeleton,
  ResourceTitleSkeleton,
  ResourceSubtitleSkeleton,
} from './index';

export const RecommendationListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <ResourceItemSkeleton key={index}>
          <ResourceIconSkeleton />
          <ResourceContentSkeleton>
            <ResourceTitleSkeleton />
            <ResourceSubtitleSkeleton />
          </ResourceContentSkeleton>
        </ResourceItemSkeleton>
      ))}
    </>
  );
};

export default RecommendationListSkeleton;
