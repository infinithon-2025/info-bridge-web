import styled from 'styled-components';

const BaseContainer = styled.div`
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  box-sizing: border-box;
  max-height: 100%;
  overflow: scroll;

  border: 20px solid #fff;
`;

export default function Container({ children }: { children: React.ReactNode }) {
  return <BaseContainer>{children}</BaseContainer>;
}
