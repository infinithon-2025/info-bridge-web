import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: transparent;
  height: 60px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px 16px;
    height: 56px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const Logo = styled.img`
  height: 36px;
  width: auto;

  @media (max-width: 768px) {
    height: 32px;
  }

  @media (max-width: 480px) {
    height: 28px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;

  @media (max-width: 768px) {
    padding: 6px 12px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    gap: 6px;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const UserEmail = styled.span`
  font-size: 12px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

interface NavbarProps {
  userEmail?: string;
  userName?: string;
}

export default function Navbar({
  userEmail = 'user@infobridge.com',
  userName = '사용자',
}: NavbarProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <NavbarWrapper>
      <LeftSection onClick={handleLogoClick}>
        <Logo src="/infobridge-logo.png" alt="Info Bridge Logo" />
        <Title>Info Bridge</Title>
      </LeftSection>

      <RightSection>
        <UserProfile>
          <UserAvatar>{getUserInitials(userName)}</UserAvatar>
          <UserInfo>
            <UserName>{userName}</UserName>
            <UserEmail>{userEmail}</UserEmail>
          </UserInfo>
        </UserProfile>
      </RightSection>
    </NavbarWrapper>
  );
}
