import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  display: inline-block;
  height: ${props => props.height || '1rem'};
  width: ${props => props.width || '100%'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: ${props => props.borderRadius || '4px'};
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const Skeleton = SkeletonBase;

export const SkeletonLine = styled(SkeletonBase)`
  margin-bottom: 8px;
`;

export const SkeletonCircle = styled(SkeletonBase)`
  border-radius: 50%;
`;

export const SkeletonText = styled.div<{ lines?: number }>`
  ${props =>
    Array.from({ length: props.lines || 3 }, (_, i) => {
      const width = i === (props.lines || 3) - 1 ? '70%' : '100%';
      return `
        &::after {
          content: '';
          display: block;
          height: 1rem;
          width: ${width};
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 37%,
            #f0f0f0 63%
          );
          background-size: 200px 100%;
          background-repeat: no-repeat;
          border-radius: 4px;
          animation: ${shimmer} 1.5s ease-in-out infinite;
          margin-bottom: ${i === (props.lines || 3) - 1 ? '0' : '8px'};
        }
        ${i < (props.lines || 3) - 1 ? `&::before { content: ''; display: block; height: 1rem; margin-bottom: 8px; }` : ''}
      `;
    }).join('')}
`;

export const ResourceItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  gap: 12px;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
`;

export const ResourceIconSkeleton = styled(SkeletonCircle)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const ResourceContentSkeleton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ResourceTitleSkeleton = styled(Skeleton)`
  height: 16px;
  width: 80%;
`;

export const ResourceSubtitleSkeleton = styled(Skeleton)`
  height: 12px;
  width: 60%;
`;

export const SummaryBlockSkeleton = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SummaryTitleSkeleton = styled(Skeleton)`
  height: 20px;
  width: 40%;
  margin-bottom: 12px;
`;

export const SummaryParagraphSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const SummaryLineSkeleton = styled(Skeleton)<{ width?: string }>`
  height: 14px;
  width: ${props => props.width || '100%'};
`;

export default Skeleton;
