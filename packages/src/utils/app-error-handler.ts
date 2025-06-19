import {HttpStatus} from "../http-status"

export class ApiResHandler extends Error{
    public readonly statusCode: number;
    public readonly success: boolean = false
    public readonly timestamp: Date
    public readonly details?: Record<string, any>
    constructor(message: string,statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,details?: Record<string, any>) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.timestamp = new Date();
        Object.setPrototypeOf(this, new.target.prototype);
    }
    public static badRequest(message = "Bad Request", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.BAD_REQUEST, details)
    }
    public static unauthorized(message = "Unauthorized", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.UNAUTHORIZED, details);
    }
    public static internal(message = "Internal Server Error", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.INTERNAL_SERVER_ERROR, details)
    }
    toJSON(): Record<string, any> {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            details: this.details,
            timestamp: this.timestamp.toISOString(),
        }
    }
}