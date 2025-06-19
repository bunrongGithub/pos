
export class AppResponse<T> {
    public readonly data: T;
    public readonly statusCode: number;
    public readonly message: string;
    public readonly success: boolean;
    public readonly timestamp: Date;
    constructor (data: T, statusCode = 200, message = "Success", success = true){
        this.data = data
        this.statusCode = statusCode
        this.message = message
        this.success = success
        this.timestamp = new Date()
    }
    public static success<T>(data: T, message = "Success", statusCode = 200): ApiResponse<T> {
        return new ApiResponse<T>(data, statusCode, message, true)
    }
    public static created<T>(data: T, message = "Resource created successfully"): ApiResponse<T> {
        return new ApiResponse<T>(data, 201, message, true)
    }
    public static noContent<T = null>(message = "No content"): ApiResponse<T> {
        return new ApiResponse<T>(null as T, 204, message, true)
    }
    public toJSON(): Record<string, any> {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            timestamp: this.timestamp.toISOString(),
        }
    }
}