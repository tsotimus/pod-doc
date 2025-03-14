
export type ApiErrors = string[]

export type ApiResponse<T> = {
    data: T
    errors: ApiErrors
}

export type PaginatedApiResponse<T> = ApiResponse<{
    items: T[]
    total: number
    page: number
    limit: number
}>
