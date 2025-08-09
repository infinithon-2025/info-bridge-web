import styled from 'styled-components';

const BaseContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Container({ children }: { children: React.ReactNode }) {
  return <BaseContainer>{children}</BaseContainer>;
}
