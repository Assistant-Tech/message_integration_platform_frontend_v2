export interface CreateCategoryProps {
  title: string;
  description?: string;
  parentId?: null;
}

export interface CategoryResponse {
  id: string;
  title: string;
  parentId: string | null;
  slug: string;
  description: string;
  children: CategoryResponse[];
  _count: {
    children: number;
  };
}

export interface FetchCategoriesResponse {
  message: string;
  success: boolean;
  data: CategoryResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  timestamp: string;
}

export interface CategoryApiError {
  message: string;
  success: false;
  timestamp: string;
}
