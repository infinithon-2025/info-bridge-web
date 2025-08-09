import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';

import { useNavigate } from 'react-router-dom';
import {
  Page,
  Main,
  Row,
  CardBase,
  CreateCard,
  CardTitle,
  CardDate,
  EmptyText,
} from './index.css';
import { type ProjectDto } from '../../types/dto/projects.dto';
import { listProjects } from '../../api/projects.api';
import { CreateProjectModal } from '../../components/create-project-modal';

function ymd(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

// 목록 API 실패/미설정 시 사용할 더미
const FALLBACK_PROJECTS: ProjectDto[] = [
  {
    id: 1,
    authorEmail: 'user@example.com',
    projectName: '인포브릿지 서버 개발',
    projectCode: 'SMG-001',
    projectKeyword: 'InfoBridge,인포브릿지,브릿지,bridge,브리찌'
      .split(',')
      .map(s => s.trim()),
    createdAt: '2025-08-09T02:35:48.042252Z',
    updatedAt: '2025-08-09T06:45:47.825268Z',
  },
];

export const ProjectListPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onCreated = ({ project }: { project: ProjectDto }) => {
    setProjects(prev => [project, ...prev]);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await listProjects();
        if (alive) setProjects(data);
      } catch (e: any) {
        if (alive) {
          setError(
            e?.message ||
              '프로젝트 목록을 불러올 수 없습니다. 더미 데이터로 표시합니다.'
          );
          setProjects(FALLBACK_PROJECTS);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Page
      style={{
        gap: 16,
        padding: 16,
        boxSizing: 'border-box',
      }}
    >
      <Navbar userName="Developer Kim" userEmail="developer@infobridge.com" />
      <Main>
        {error && (
          <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 8 }}>
            {error}
          </div>
        )}

        <Row>
          <CreateCard
            to="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setShowCreate(true);
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  margin: '0 auto 8px',
                  height: 48,
                  width: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9999,
                  background: '#f5f5f5',
                  color: '#525252',
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                +
              </div>
              <div style={{ color: '#525252' }}>새 프로젝트 만들기</div>
            </div>
          </CreateCard>

          {(projects || []).map(p => (
            <CardBase key={p.id} to={`/projects/${p.id}`}>
              <div style={{ flex: 1 }}>
                <CardTitle>
                  {p.projectName} ({p.projectCode})
                </CardTitle>
              </div>
              <CardDate>{ymd(p.createdAt)}</CardDate>
            </CardBase>
          ))}
        </Row>

        {projects && projects.length === 0 && (
          <EmptyText>
            아직 프로젝트가 없습니다. ‘새 프로젝트 만들기’를 눌러 생성해 보세요.
          </EmptyText>
        )}
      </Main>
      {showCreate && (
        <CreateProjectModal
          onClose={() => setShowCreate(false)}
          onSuccess={onCreated}
        />
      )}
    </Page>
  );
};
