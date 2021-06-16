/**
 * Defines a success response with content.
 */
export interface DataResponse<T> {
    data: T;
    error: {
        message: string;
    };
}
