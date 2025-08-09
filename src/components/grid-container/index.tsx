import styled, { css as styledCss, CSSObject } from 'styled-components';

const BaseGridContainer = styled.div<{ $css?: CSSObject }>`
  display: grid;
  gap: 16px;
  ${({ $css }) => $css && styledCss($css)}
`;

export default function GridContainer({
  children,
  css: cssObject,
}: {
  children: React.ReactNode;
  css?: CSSObject;
}) {
  return <BaseGridContainer $css={cssObject}>{children}</BaseGridContainer>;
}
