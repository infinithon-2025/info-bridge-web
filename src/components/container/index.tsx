import styled from 'styled-components';

const BaseContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* width: 100%; */
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: unset;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 12px;
  }
`;

export default function Container({ children }: { children: React.ReactNode }) {
  return <BaseContainer>{children}</BaseContainer>;
}
