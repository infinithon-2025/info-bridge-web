import {
  SummaryBlockSkeleton,
  SummaryTitleSkeleton,
  SummaryParagraphSkeleton,
  SummaryLineSkeleton,
} from './index';

export const SummarySkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }, (_, blockIndex) => (
        <SummaryBlockSkeleton key={blockIndex}>
          <SummaryTitleSkeleton />
          <SummaryParagraphSkeleton>
            <SummaryLineSkeleton width="95%" />
            <SummaryLineSkeleton width="87%" />
            <SummaryLineSkeleton width="92%" />
            {blockIndex % 2 === 0 && <SummaryLineSkeleton width="78%" />}
          </SummaryParagraphSkeleton>
        </SummaryBlockSkeleton>
      ))}
    </>
  );
};

export default SummarySkeleton;
