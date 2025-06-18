export interface AxiosResponse<T = undefined> {
    status: number;
    message: string;
    data?: T;
}
export interface AxiosError <T= undefined>{
    response: {
        status: number;
        config: {
            url: string;
            method: string;
            headers: Record<string, string>;
            data?: string;
        };
        data: {
            message: string;
            data?: T;
        };
    }
}