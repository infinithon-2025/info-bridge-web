import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export const Main = styled.main`
  flex: 1;
  padding: 16px 24px;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const CardBase = styled(Link)`
  flex: 1 1 calc((100% - 16px) / 2);
  max-width: calc((100% - 16px) / 2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    flex-basis: calc((100% - 32px) / 3);
    max-width: calc((100% - 32px) / 3);
  }
  @media (min-width: 1440px) {
    flex-basis: calc((100% - 48px) / 4);
    max-width: calc((100% - 48px) / 4);
  }

  aspect-ratio: 4 / 3;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.15s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }
`;

export const CreateCard = styled(CardBase)`
  border-style: dashed;
  border-width: 2px;
  border-color: #d4d4d4;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #a3a3a3;
  }
`;

export const CreateButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background: #000;
  color: #fff;
  border-radius: 10px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background: #222;
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardDate = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #737373;
`;

export const EmptyText = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #737373;
`;
