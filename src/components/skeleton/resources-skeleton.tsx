import {
  ResourceItemSkeleton,
  ResourceIconSkeleton,
  ResourceContentSkeleton,
  ResourceTitleSkeleton,
  ResourceSubtitleSkeleton,
} from './index';

export const ResourcesListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
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

export default ResourcesListSkeleton;
