import styled from 'styled-components';

interface HRProps {
  height?: number | string;
  color?: string;
  margin?: number | string;
}

const StyledHR = styled.hr<HRProps>`
  border: none;
  height: ${({ height = 1 }) =>
    typeof height === 'number' ? `${height}px` : height};
  background-color: ${({ color = '#dee2e6' }) => color};
  margin: ${({ margin = '16px 0' }) =>
    typeof margin === 'number' ? `${margin}px 0` : margin};
  width: 100%;
`;

export default function HR({
  height = 1,
  color = '#dee2e6',
  margin = '16px 0',
}: HRProps) {
  return <StyledHR height={height} color={color} margin={margin} />;
}
