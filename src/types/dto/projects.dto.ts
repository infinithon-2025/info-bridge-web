export type ProjectDto = {
  id: number;
  authorEmail: string;
  projectName: string;
  projectCode: string;
  projectKeyword?: string[];
  links?: string[];
  createdAt: string;
  updatedAt: string;
};

export type LinkItemDto = {
  itemId: number;
  materialType: string;
  link: string;
  title: string;
  body: string;
  isFixed: 'true' | 'false';
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectRequestDto = {
  authorEmail: string;
  projectName: string;
  projectCode: string;
  projectKeyword?: string[];
  links?: string[];
};

export type CreateProjectResponseDto = {
  project: ProjectDto;
  links: LinkItemDto[];
};

export type GetProjectResponseDto = {
  project: ProjectDto;
  links: LinkItemDto[];
};
