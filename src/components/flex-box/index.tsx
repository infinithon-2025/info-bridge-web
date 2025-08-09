import React from 'react';
import styled from 'styled-components';

const StyledFlexBox = styled.div<{ css?: React.CSSProperties }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ css }) => css && { ...css }};
`;

export default function FlexBox({
  children,
  css,
}: {
  children: React.ReactNode;
  css?: React.CSSProperties;
}) {
  return <StyledFlexBox css={css}>{children}</StyledFlexBox>;
}
