export type ProjectDto = {
  id: number;
  authorEmail: string;
  projectName: string;
  projectCode: string;
  projectKeyword?: string[];
  createdAt: string;
  updatedAt: string;
};

export type LinkItemDto = {
  id: number;
  channelName: string;
  isActive: boolean;
  isFixed: boolean;
  projectName: string;
  createdAt: string;
  materialType: string;
  link: string;
  title: string;
  body: string;
  originCreatedAt: string;
  originUpdatedAt: string;
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

export type SummaryDto = {
  id: number;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type RecommendationDto = {
  id: number;
  title: string;
  content: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
};

// Paginated response wrapper
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// Updated resource item DTO to match API specification
export type ResourceItemDto = {
  id: number;
  project_name: string;
  material_type: string;
  channel_name: string;
  title: string;
  body: string;
  link: string;
  is_fixed: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  origin_data_created_at: string;
  origin_data_updated_at: string;
  project: number;
  project_material: number;
};

// Updated summary DTO to match API specification
export type SummaryItemDto = {
  id: number;
  project_name: string;
  content: string;
  created_at: string;
  updated_at: string;
  project: number;
  ai_request: number;
};

// Simple recommendation response
export type RecommendationResponseDto = {
  body: string;
};

// Recommendation item from paginated API
export type RecommendationItemDto = {
  id: number;
  project_name: string;
  item_title: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  project: number;
  item: number;
  project_material: number;
};

// Response from toggle fixed API
export type ToggleFixedResponseDto = {
  channel_name: string;
  title: string;
  body: string;
  link: string;
  is_fixed: boolean;
  is_active: boolean;
  project: number;
  project_material: number;
};

// Request for adding new link/item
export type AddLinkRequestDto = {
  channel_name: string;
  title: string;
  body: string;
  link: string;
  is_fixed: boolean;
  is_active: boolean;
  project: number;
  project_material: number;
};

// Response from add link API
export type AddLinkResponseDto = {
  id: number;
  project_name: string;
  material_type: string;
  channel_name: string;
  title: string;
  body: string;
  link: string;
  is_fixed: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  origin_data_created_at: string;
  origin_data_updated_at: string;
  project: number;
  project_material: number;
};

// Updated response types for paginated endpoints
export type GetResourcesResponseDto = PaginatedResponse<ResourceItemDto>;
export type GetSummariesResponseDto = PaginatedResponse<SummaryItemDto>;
export type GetRecommendationItemsResponseDto =
  PaginatedResponse<RecommendationItemDto>;

// Keep existing types for backward compatibility
export type GetProjectItemsResponseDto = {
  id: number;
  channel_name: string;
  is_active: boolean;
  is_fixed: boolean;
  project_name: string;
  created_at: string;
  material_type: string;
  link: string;
  title: string;
  body: string;
  origin_created_at: string;
  origin_updated_at: string;
};

export type GetProjectSummariesResponseDto = SummaryDto[];
export type GetRecommendationsResponseDto = RecommendationDto[];
