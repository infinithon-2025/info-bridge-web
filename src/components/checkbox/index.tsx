import styled from 'styled-components';
import { ChangeEvent } from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover:not([data-disabled='true']) {
    opacity: 0.8;
  }

  &[data-disabled='true'] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean; disabled: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${({ checked }) => (checked ? '#007bff' : '#ffffff')};
  border: 2px solid ${({ checked }) => (checked ? '#007bff' : '#dee2e6')};
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;

  ${({ disabled }) =>
    disabled &&
    `
    background: #f8f9fa;
    border-color: #dee2e6;
  `}

  &::after {
    content: '';
    position: absolute;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const Label = styled.label<{ disabled: boolean }>`
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? '#6c757d' : '#212529')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  name,
}: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <CheckboxWrapper data-disabled={disabled}>
      <HiddenCheckbox
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        name={name}
      />
      <StyledCheckbox checked={checked} disabled={disabled} />
      {label && (
        <Label htmlFor={id} disabled={disabled}>
          {label}
        </Label>
      )}
    </CheckboxWrapper>
  );
}
