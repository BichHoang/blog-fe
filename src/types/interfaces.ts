export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  description: string;
  publishedAt: string;
  tags: Tag[];
  comments: Comment[];
}

export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  per_page: number;
  total_count: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export interface Tag {
  id: number;
  name: string;
  articlesCount: number;
  slug: string;
}

export interface CommentProps {
  comments: Comment[];
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  created_at: string;
  parent_id: number;
  replies: Comment[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}
