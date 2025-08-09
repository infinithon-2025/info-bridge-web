import { useState, useEffect } from 'react';
import {
  ProjectDto,
  GetProjectItemsResponseDto,
  GetProjectSummariesResponseDto,
  GetRecommendationsResponseDto,
  GetResourcesResponseDto,
  GetSummariesResponseDto,
  GetRecommendationItemsResponseDto,
  RecommendationResponseDto,
  ToggleFixedResponseDto,
  AddLinkRequestDto,
  AddLinkResponseDto,
  LinkItemDto,
  SummaryDto,
  RecommendationDto,
  ResourceItemDto,
  SummaryItemDto,
  RecommendationItemDto,
} from '../../types/dto/projects.dto';

const BASE_URL = 'http://localhost:8000';

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};

export const useProjectItems = (projectId: number) => {
  const [items, setItems] = useState<LinkItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/api/projects/${projectId}/items/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProjectItemsResponseDto[] = await response.json();
      const mappedItems = data.map(item => ({
        id: item.id,
        materialType: item.material_type,
        link: item.link,
        title: item.title ?? item.body,
        body: item.body,
        isFixed: item.is_fixed,
        createdAt: item.created_at,
        originUpdatedAt: item.origin_updated_at,
        originCreatedAt: item.origin_created_at,
        isActive: item.is_active,
        channelName: item.channel_name,
        projectName: item.project_name,
      }));

      setItems(mappedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectItems();
    }
  }, [projectId]);

  return {
    items,
    loading,
    error,
    refetch: fetchProjectItems,
  };
};

export const useProjectSummaries = (projectId: number) => {
  const [summaries, setSummaries] = useState<SummaryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectSummaries = async () => {
    try {
      setLoading(true);
      setError(null);
      const _ = await fetch(
        `${BASE_URL}/api/projects/${projectId}/summarize-items/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: projectId }),
        }
      );
      // This endpoint is used to trigger summarization, not to fetch summaries
      // So we don't need to handle the response here

      const response = await fetch(
        `${BASE_URL}/api/projects/${projectId}/summaries/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetProjectSummariesResponseDto = await response.json();
      setSummaries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectSummaries();
    }
  }, [projectId]);

  return {
    summaries,
    loading,
    error,
    refetch: fetchProjectSummaries,
  };
};

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationDto[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/recommendations/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetRecommendationsResponseDto = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations,
  };
};

// New hook for paginated resources
export const useResources = (projectId: number) => {
  const [resources, setResources] = useState<ResourceItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetResourcesResponseDto = await response.json();
      console.log(
        'Fetched resources:',
        data.results[3].is_active,
        data.results[3].is_fixed
      );
      setResources(
        data.results.filter(item => item.is_active && item.is_fixed)
      );

      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchResources();
    }
  }, [projectId]);

  return {
    resources,
    loading,
    error,
    pagination,
    refetch: fetchResources,
  };
};

// New hook for paginated summaries
export const useSummaries = (projectId: number) => {
  const [summaries, setSummaries] = useState<SummaryItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const fetchSummaries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/summaries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetSummariesResponseDto = await response.json();
      setSummaries(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchSummaries();
    }
  }, [projectId]);

  return {
    summaries,
    loading,
    error,
    pagination,
    refetch: fetchSummaries,
  };
};

// New hook for recommendation
export const useRecommendation = (projectId: number) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendation = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: RecommendationResponseDto = await response.json();
      setRecommendation(data.body);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchRecommendation();
    }
  }, [projectId]);

  return {
    recommendation,
    loading,
    error,
    refetch: fetchRecommendation,
  };
};

// New hook for paginated recommendation items
export const useRecommendationItems = (projectId: number) => {
  const [recommendationItems, setRecommendationItems] = useState<
    RecommendationItemDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const fetchRecommendationItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetRecommendationItemsResponseDto = await response.json();
      setRecommendationItems(data.results);
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchRecommendationItems();
    }
  }, [projectId]);

  return {
    recommendationItems,
    loading,
    error,
    pagination,
    refetch: fetchRecommendationItems,
  };
};

// Hook for toggling item fixed status
export const useToggleFixed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFixed = async (
    itemId: number
  ): Promise<ToggleFixedResponseDto> => {
    console.log('toggleFixed called with itemId:', itemId);
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}/api/items/${itemId}/toggle_fixed/`;
      console.log('Making PATCH request to:', url);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId }),
      });
      console.log('Response status:', response.status, 'ok:', response.ok);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (err) {
      console.error('Error in toggleFixed:', err);
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleMultipleFixed = async (
    itemIds: number[]
  ): Promise<ToggleFixedResponseDto[]> => {
    console.log('toggleMultipleFixed called with itemIds:', itemIds);
    try {
      setLoading(true);
      setError(null);

      // Create individual API calls without using the local toggleFixed function
      // to avoid recursive loading state issues
      const promises = itemIds.map(async itemId => {
        console.log('Making individual toggle request for itemId:', itemId);
        const url = `${BASE_URL}/api/items/${itemId}/toggle_fixed/`;
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: itemId }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      });

      console.log('Created promises for', promises.length, 'items');
      const results = await Promise.all(promises);
      console.log('All toggles completed, results:', results);
      return results;
    } catch (err) {
      console.error('Error in toggleMultipleFixed:', err);
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleFixed,
    toggleMultipleFixed,
    loading,
    error,
  };
};

// Hook for adding new link/item
export const useAddLink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLink = async (
    projectId: number,
    linkData: Omit<AddLinkRequestDto, 'project'>
  ): Promise<AddLinkResponseDto> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/items/${projectId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...linkData,
          project: projectId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Add link result:', data);
      return data;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    addLink,
    loading,
    error,
  };
};

// Hook for updating item is_fixed field (kept for backward compatibility)
export const useUpdateItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateItem = async (itemId: number, isFixed: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_fixed: isFixed }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateItem,
    loading,
    error,
  };
};
