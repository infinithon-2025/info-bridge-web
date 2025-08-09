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
  CardBg,
  CardOverlay,
  CardContent,
} from './index.css';
import { type ProjectDto } from '../../types/dto/projects.dto';
import { listProjects } from '../../api/projects.api';
import { CreateProjectModal } from '../../components/create-project-modal';
import calender from '../../assets/calendar.png';
import usericon from '../../assets/usericon.png';
import bridge1 from '../../assets/bridge1.jpg';
import bridge2 from '../../assets/bridge2.jpg';
import bridge3 from '../../assets/bridge3.jpg';
import bridge4 from '../../assets/bridge4.jpg';
import bridge5 from '../../assets/bridge5.jpg';
import bridge6 from '../../assets/bridge6.jpg';
import bridge7 from '../../assets/bridge7.jpg';
import bridge8 from '../../assets/bridge8.jpg';
import bridge9 from '../../assets/bridge9.jpg';
import bridge10 from '../../assets/bridge10.jpg';
import bridge11 from '../../assets/bridge11.jpg';
import bridge12 from '../../assets/bridge12.jpg';
import bridge13 from '../../assets/bridge13.jpg';
import bridge14 from '../../assets/bridge14.jpg';
import bridge15 from '../../assets/bridge15.jpg';
import bridge16 from '../../assets/bridge16.jpg';

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
  const BRIDGES = [
    bridge1,
    bridge2,
    bridge3,
    bridge4,
    bridge5,
    bridge6,
    bridge7,
    bridge8,
    bridge9,
    bridge10,
    bridge11,
    bridge12,
    bridge13,
    bridge14,
    bridge15,
    bridge16,
  ];

  function randomBridge() {
    const idx = Math.floor(Math.random() * BRIDGES.length);
    return BRIDGES[idx];
  }

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
              {/* 배경 이미지 레이어 */}
              <CardBg src={randomBridge()} alt="" />
              {/* 선택: 살짝 어둡게 오버레이 (원치 않으면 제거) */}
              <CardOverlay />

              {/* 내용 레이어 */}
              <CardContent>
                <CardTitle>{p.projectName}</CardTitle>
                <div style={{ fontSize: 13 }}>{p.projectCode}</div>

                <div>
                  <CardDate>
                    <img style={{ width: 12 }} src={usericon} alt="" />{' '}
                    {p.authorEmail}
                  </CardDate>
                  <CardDate>
                    <img style={{ width: 12 }} src={calender} alt="" />{' '}
                    {ymd(p.createdAt)}
                  </CardDate>
                </div>
              </CardContent>
            </CardBase>
          ))}
          {/* {(projects || []).map(p => (
            <CardBase key={p.id} to={`/projects/${p.id}`}>
              <img src={bridge} style={{ display: 'flex' }} />
              <CardTitle>{p.projectName}</CardTitle>
              {p.projectCode}
              <div>
                <CardDate>
                  <img style={{ width: '12px' }} src={usericon} />{' '}
                  {p.authorEmail}
                </CardDate>
                <CardDate>
                  <img style={{ width: '12px' }} src={calender} />{' '}
                  {ymd(p.createdAt)}
                </CardDate>
              </div>
            </CardBase>
          ))} */}
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
