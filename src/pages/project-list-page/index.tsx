import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Page,
  Header,
  Title,
  Main,
  SectionTitle,
  Row,
  CardBase,
  CreateCard,
  CreateButton,
  CardTitle,
  CardDate,
  EmptyText,
} from './index.css';
import { type ProjectDto } from '../../types/dto/projects.dto';

function ymd(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

export const ProjectListPage = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([
    // 프로젝트 더미데이터
    {
      id: 101,
      authorEmail: 'dev@example.com',
      projectName: '프로젝트 A 기획',
      projectCode: 'PA-2025-01',
      projectKeyword: ['기획', '요구사항'],
      links: ['https://github.com/org/repo-a'],
      createdAt: '2025-08-01T09:00:00Z',
      updatedAt: '2025-08-01T09:00:00Z',
    },
    {
      id: 102,
      authorEmail: 'ux@example.com',
      projectName: '프로젝트 B 디자인 시안',
      projectCode: 'PB-2025-02',
      projectKeyword: ['디자인', '시안'],
      links: ['https://jira.example.com/browse/DESIGN-12'],
      createdAt: '2025-08-05T10:30:00Z',
      updatedAt: '2025-08-05T10:30:00Z',
    },
    {
      id: 103,
      authorEmail: 'fe@example.com',
      projectName: '프로젝트 C 개발 일정',
      projectCode: 'PC-2025-03',
      projectKeyword: ['개발', '일정'],
      links: ['https://slack.com/app_redirect?channel=C123456'],
      createdAt: '2025-08-09T12:00:00Z',
      updatedAt: '2025-08-09T12:00:00Z',
    },
  ]);

  const navigate = useNavigate();

  const onCreated = ({ project }: { project: ProjectDto }) => {
    setProjects(prev => [project, ...prev]);
    navigate(`/projects/${project.id}`);
  };

  return (
    <Page>
      <Header>
        <Title>Projects</Title>
        <CreateButton onClick={() => navigate(`/projects/new`)}>
          새 프로젝트 만들기
        </CreateButton>
      </Header>

      <Main>
        <SectionTitle>최근 프로젝트</SectionTitle>
        <Row>
          <CreateCard
            to="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              navigate(`/projects/new`);
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

          {projects.map(p => (
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

        {projects.length === 0 && (
          <EmptyText>
            아직 프로젝트가 없습니다. ‘새 프로젝트 만들기’를 눌러 생성해 보세요.
          </EmptyText>
        )}
      </Main>
    </Page>
  );
};
