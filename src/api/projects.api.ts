import axios from 'axios';
import {
  type CreateProjectRequestDto,
  type CreateProjectResponseDto,
  type GetProjectResponseDto,
} from '../types/dto/projects.dto';

const API_BASE = process.env.REACT_APP_API_BASE || '';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

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
