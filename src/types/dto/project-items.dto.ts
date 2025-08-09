// 재료 타입 정의
export type MaterialType =
  | 'github'
  | 'jira'
  | 'slack'
  | 'confluence'
  | 'google-drive'
  | 'notion';

// 프로젝트 정보 인터페이스
export interface Project {
  id: number;
  authorEmail: string;
  projectName: string;
  projectCode: string;
  projectKeyword: string[];
  createdAt: string; // ISO 8601 날짜 문자열
  updatedAt: string; // ISO 8601 날짜 문자열
}

// 링크/자료 아이템 인터페이스
export interface LinkItem {
  itemId: number;
  materialType: MaterialType;
  link: string;
  title: string;
  body: string;
  isFixed: string; // "true" | "false" - JSON에서 문자열로 오는 경우
  createdAt: string; // ISO 8601 날짜 문자열
  updatedAt: string; // ISO 8601 날짜 문자열
}

// 전체 프로젝트 데이터 인터페이스
export interface ProjectData {
  project: Project;
  links: LinkItem[];
}

// 더 엄격한 타입을 원한다면 isFixed를 boolean으로
export interface LinkItemStrict {
  itemId: number;
  materialType: MaterialType;
  link: string;
  title: string;
  body: string;
  isFixed: boolean; // boolean 타입
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDataStrict {
  project: Project;
  links: LinkItemStrict[];
}

// Date 객체를 사용하는 버전
export interface ProjectWithDates {
  id: number;
  authorEmail: string;
  projectName: string;
  projectCode: string;
  projectKeyword: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkItemWithDates {
  itemId: number;
  materialType: MaterialType;
  link: string;
  title: string;
  body: string;
  isFixed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDataWithDates {
  project: ProjectWithDates;
  links: LinkItemWithDates[];
}

// 사용 예시 및 타입 가드
export const isValidMaterialType = (type: string): type is MaterialType => {
  return [
    'github',
    'jira',
    'slack',
    'confluence',
    'google-drive',
    'notion',
  ].includes(type);
};

// JSON 데이터를 타입 안전하게 변환하는 유틸리티 함수
export const parseProjectData = (jsonData: any): ProjectData => {
  // 런타임 유효성 검사 추가 가능
  return {
    project: {
      id: Number(jsonData.project.id),
      authorEmail: String(jsonData.project.authorEmail),
      projectName: String(jsonData.project.projectName),
      projectCode: String(jsonData.project.projectCode),
      projectKeyword: Array.isArray(jsonData.project.projectKeyword)
        ? jsonData.project.projectKeyword.map(String)
        : [],
      createdAt: String(jsonData.project.createdAt),
      updatedAt: String(jsonData.project.updatedAt),
    },
    links: Array.isArray(jsonData.links)
      ? jsonData.links.map((link: any) => ({
          itemId: Number(link.itemId),
          materialType: link.materialType as MaterialType,
          link: String(link.link),
          title: String(link.title),
          body: String(link.body),
          isFixed: String(link.isFixed),
          createdAt: String(link.createdAt),
          updatedAt: String(link.updatedAt),
        }))
      : [],
  };
};

// 문자열 boolean을 실제 boolean으로 변환
export const convertToStrictTypes = (data: ProjectData): ProjectDataStrict => {
  return {
    project: data.project,
    links: data.links.map(link => ({
      ...link,
      isFixed: link.isFixed === 'true',
    })),
  };
};

// Date 객체로 변환
export const convertToDates = (
  data: ProjectDataStrict
): ProjectDataWithDates => {
  return {
    project: {
      ...data.project,
      createdAt: new Date(data.project.createdAt),
      updatedAt: new Date(data.project.updatedAt),
    },
    links: data.links.map(link => ({
      ...link,
      createdAt: new Date(link.createdAt),
      updatedAt: new Date(link.updatedAt),
    })),
  };
};
