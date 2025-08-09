import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export const ModalBg = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalCard = styled.div`
  width: 560px;
  max-width: calc(100% - 32px);
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  display: grid;
  gap: 12px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  text-align: left;
  font-size: 13px;
  color: #404040;
  font-weight: 500;
`;

export const Input = styled.input`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00000020;
  }
`;

export const Textarea = styled.textarea`
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  min-height: 72px;
  resize: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00000020;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 4px;
`;

export const GhostBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

export const PrimaryBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background: #222;
  }
`;
