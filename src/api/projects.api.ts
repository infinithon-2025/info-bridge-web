import axios from 'axios';

import {
  type ProjectDto,
  type CreateProjectRequestDto,
  type CreateProjectResponseDto,
  type GetProjectResponseDto,
} from '../types/dto/projects.dto';

const API_BASE = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

type ProjectListResponse = {
  count: number;
  next: null;
  previous: null;
  results: Array<{
    id: number;
    author_email: string;
    project_name: string;
    project_code: string;
    project_keyword: string;
    created_at: string;
    updated_at: string;
  }>;
};

// GET /api/projects/
export async function listProjects(): Promise<ProjectDto[]> {
  const { data } = await api.get<ProjectListResponse>('/projects/');
  return (data.results || []).map(p => ({
    id: p.id,
    authorEmail: p.author_email,
    projectName: p.project_name,
    projectCode: p.project_code,
    projectKeyword:
      p.project_keyword
        ?.split(',')
        .map(s => s.trim())
        .filter(Boolean) || [],
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));
}

// POST /api/projects/
export async function createProjectApi(body: {
  author_email: string;
  project_name: string;
  project_code: string;
  project_keyword: string;
}) {
  const { data } = await api.post('/projects/', body);

  return data;
}

// POST /api/materials/
export async function createMaterialApi(body: {
  material_type: string;
  material_link: string;
  project: number;
}) {
  const { data } = await api.post('/materials/', body);
  return data;
}

// POST /api/projects/{id}/create_items_from_external_matches_by_code/
export async function createItemsByCodeApi(
  projectId: number,
  body: {
    author_email: string;
    project_name: string;
    project_code: string;
    project_keyword?: string;
  }
) {
  const { data } = await api.post(
    `/projects/${projectId}/create_items_from_external_matches_by_code/`,
    body
  );
  return data;
}

// POST /api/projects/{id}/create_items_from_external_matches_by_keyword/
export async function createItemsByKeywordApi(
  projectId: number,
  body: {
    author_email: string;
    project_name: string;
    project_code: string;
    project_keyword?: string;
  }
) {
  const { data } = await api.post(
    `/projects/${projectId}/create_items_from_external_matches_by_keyword/`,
    body
  );
  return data;
}

export async function createProject(body: CreateProjectRequestDto) {
  const { data } = await api.post<CreateProjectResponseDto>('/projects', body);
  return data;
}

export async function getProject(projectId: string | number) {
  const { data } = await api.get<GetProjectResponseDto>(
    `/projects/${projectId}`
  );
  return data;
}
