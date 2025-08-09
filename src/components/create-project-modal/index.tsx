import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Title,
  ModalBg,
  ModalCard,
  Field,
  Label,
  Input,
  Textarea,
  ModalActions,
  GhostBtn,
  PrimaryBtn,
} from './index.css';

import {
  createProjectApi,
  createMaterialApi,
  createItemsByCodeApi,
  createItemsByKeywordApi,
} from '../../api/projects.api';

import {
  type CreateProjectRequestDto,
  type ProjectDto,
} from '../../types/dto/projects.dto';

type CreateMaterialPayload = {
  material_type: 'github' | 'jira' | 'slack' | 'web' | string;
  material_link: string;
  project: number;
};

type LinkItemForm = {
  material_type: 'github' | 'jira' | 'slack' | 'web' | string;
  material_link: string;
};

export function CreateProjectModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (created: { project: ProjectDto }) => void;
}) {
  const navigate = useNavigate();
  const [authorEmail, setAuthorEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [projectKeyword, setProjectKeyword] = useState('');
  const [linkItems, setLinkItems] = useState<LinkItemForm[]>([
    { material_type: 'github', material_link: '' },
  ]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const parseCSV = (s: string) =>
    s
      .split(',')
      .map(v => v.trim())
      .filter(Boolean);

  const addLinkItem = () => {
    setLinkItems(prev => [
      ...prev,
      { material_type: 'web', material_link: '' },
    ]);
  };

  const removeLinkItem = (idx: number) => {
    setLinkItems(prev => prev.filter((_, i) => i !== idx));
  };

  const updateLinkItem = (idx: number, patch: Partial<LinkItemForm>) => {
    setLinkItems(prev =>
      prev.map((item, i) => (i === idx ? { ...item, ...patch } : item))
    );
  };

  const submit = async () => {
    setErr(null);

    if (!authorEmail || !projectName || !projectCode) {
      setErr('Email, 프로젝트명, 프로젝트 코드는 필수입니다.');
      return;
    }

    // 링크 항목 유효성 체크(비어있는 항목은 제외)
    const validLinkItems = linkItems
      .map(i => ({
        material_type: i.material_type?.trim(),
        material_link: i.material_link?.trim(),
      }))
      .filter(i => i.material_link);

    setLoading(true);
    try {
      // POST /api/projects/
      const keywordString =
        projectKeyword.trim().length > 0
          ? parseCSV(projectKeyword).join(',')
          : '';

      const reqBody: any = {
        author_email: authorEmail,
        project_name: projectName,
        project_code: projectCode,
        project_keyword: keywordString || undefined,
      };

      const created = await createProjectApi(reqBody);
      const projectId: number = created.id;

      // POST /api/materials/
      if (validLinkItems.length > 0) {
        const materialPayloads: CreateMaterialPayload[] = validLinkItems.map(
          item => ({
            material_type:
              item.material_type || inferMaterialType(item.material_link),
            material_link: item.material_link,
            project: projectId,
          })
        );

        await Promise.all(
          materialPayloads.map(payload => createMaterialApi(payload))
        );
      }

      // POST /api/projects/{id}/create_items_from_external_matches_by_code/
      // POST /api/projects/{id}/create_items_from_external_matches_by_keyword/
      const triggerBody = {
        author_email: authorEmail,
        project_name: projectName,
        project_code: projectCode,
        project_keyword: keywordString || '',
      };

      await Promise.all([
        createItemsByCodeApi(projectId, triggerBody),
        createItemsByKeywordApi(projectId, triggerBody),
      ]);

      navigate(`/project/${projectId}`);
    } catch (e: any) {
      setErr(e?.message || '프로젝트 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBg onClick={onClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <Title style={{ fontSize: 18 }}>새 프로젝트 등록하기</Title>

        <Field>
          <Label>Email</Label>
          <Input
            placeholder="smilegate@example.com"
            value={authorEmail}
            onChange={e => setAuthorEmail(e.target.value)}
          />
        </Field>

        <Field>
          <Label>프로젝트명</Label>
          <Input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />
        </Field>

        <Field>
          <Label>프로젝트 코드 (예: KT-2025-01)</Label>
          <Input
            value={projectCode}
            onChange={e => setProjectCode(e.target.value)}
          />
        </Field>

        <Field>
          <Label>키워드 (쉼표로 구분)</Label>
          <Input
            placeholder="webrtc, 정산"
            value={projectKeyword}
            onChange={e => setProjectKeyword(e.target.value)}
          />
        </Field>

        <Label>관련 링크</Label>
        {linkItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr auto',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <select
              value={item.material_type}
              onChange={e =>
                updateLinkItem(idx, { material_type: e.target.value })
              }
              style={{
                width: '100%',
                border: '1px solid #e5e5e5',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 14,
              }}
            >
              <option value="github">github</option>
              <option value="jira">jira</option>
              <option value="slack">slack</option>
              <option value="web">web</option>
            </select>

            <Input
              placeholder="https://github.com/org/repo"
              value={item.material_link}
              onChange={e =>
                updateLinkItem(idx, { material_link: e.target.value })
              }
            />

            <div>
              <GhostBtn
                onClick={() => removeLinkItem(idx)}
                disabled={linkItems.length === 1}
                title={linkItems.length === 1 ? '최소 1개 항목' : '삭제'}
              >
                삭제
              </GhostBtn>
            </div>
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 8,
          }}
        >
          <GhostBtn onClick={addLinkItem}>+ 링크 추가</GhostBtn>
        </div>

        {err && <div style={{ color: '#dc2626', fontSize: 13 }}>{err}</div>}

        <ModalActions>
          <GhostBtn onClick={onClose} disabled={loading}>
            취소
          </GhostBtn>
          <PrimaryBtn onClick={submit} disabled={loading}>
            {loading ? '생성 중...' : '생성'}
          </PrimaryBtn>
        </ModalActions>
      </ModalCard>
    </ModalBg>
  );
}

function inferMaterialType(
  url: string
): 'github' | 'jira' | 'slack' | 'web' | string {
  const u = url.toLowerCase();
  if (u.includes('github.com')) return 'github';
  if (u.includes('jira')) return 'jira';
  if (u.includes('slack.com')) return 'slack';
  return 'web';
}
