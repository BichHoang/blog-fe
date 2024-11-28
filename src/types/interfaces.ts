export interface Post {
    id: number;
    slug: string;
    date: string;
    title: string;
    content: string;
    description: string;
    publishedAt: string; // ISO string or null if unpublished
    tags: string[]; // Array of tag strings
}

export interface HomeProps {
    posts: Post[]; // Array of Post objects
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
