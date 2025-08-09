import styled from 'styled-components';
import { ComponentType } from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  size?: number | string;
  className?: string;
}

interface ButtonProps {
  title: string;
  onClick?: () => void;
  leftIcon?: IconType | ComponentType<IconProps>;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  isFull?: boolean;
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary';
  $isFull: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 24px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  width: ${({ $isFull }) => ($isFull ? '100%' : 'auto')};

  ${({ variant }) =>
    variant === 'primary'
      ? `
        background-color: #007bff;
        color: white;
        
        &:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `
      : `
        background-color: #f8f9fa;
        color: #212529;
        border: 1px solid #dee2e6;
        
        &:hover:not(:disabled) {
          background-color: #e9ecef;
        }
      `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

export default function Button({
  title,
  onClick,
  leftIcon: LeftIcon,
  disabled = false,
  variant = 'primary',
  isFull = false,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      $isFull={isFull}
      type="button"
    >
      {LeftIcon && (
        <IconWrapper>
          {(() => {
            const IconComponent = LeftIcon as ComponentType<IconProps>;
            return <IconComponent size={16} />;
          })()}
        </IconWrapper>
      )}
      {title}
    </StyledButton>
  );
}
