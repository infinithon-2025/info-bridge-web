import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../button';
import { AddLinkRequestDto } from '../../types/dto/projects.dto';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (linkData: Omit<AddLinkRequestDto, 'project'>) => void;
  loading?: boolean;
}

export default function AddLinkModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: AddLinkModalProps) {
  const [formData, setFormData] = useState({
    channel_name: '',
    title: '',
    body: '',
    link: '',
    is_fixed: true,
    is_active: true,
    project_material: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseInt(value) || 0
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      channel_name: '',
      title: '',
      body: '',
      link: '',
      is_fixed: true,
      is_active: true,
      project_material: 0,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>새 리소스 추가</ModalTitle>
          <CloseButton onClick={handleClose} type="button">
            ×
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="리소스 제목을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="link">링크 *</Label>
            <Input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              required
              placeholder="https://example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="channel_name">채널명</Label>
            <Select
              id="channel_name"
              name="channel_name"
              value={formData.channel_name}
              onChange={handleChange}
            >
              <option value="">채널 선택</option>
              <option value="github">GitHub</option>
              <option value="jira">Jira</option>
              <option value="confluence">Confluence</option>
              <option value="slack">Slack</option>
              <option value="notion">Notion</option>
              <option value="google-drive">Google Drive</option>
              <option value="other">기타</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="body">설명</Label>
            <TextArea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="리소스에 대한 설명을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="project_material">프로젝트 자료 ID</Label>
            <Input
              id="project_material"
              name="project_material"
              type="number"
              value={formData.project_material}
              onChange={handleChange}
              placeholder="0"
            />
          </FormGroup>

          <ButtonGroup>
            <Button
              variant="secondary"
              title="취소"
              onClick={handleClose}
              disabled={loading}
            />
            <Button
              variant="primary"
              title={loading ? '추가 중...' : '추가'}
              onClick={() =>
                handleSubmit(new Event('submit') as unknown as React.FormEvent)
              }
              disabled={loading || !formData.title || !formData.link}
            />
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
