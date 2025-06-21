import { HttpStatus } from "@/src/utils/http-status";

export class ApiResHandler extends Error {
    public readonly statusCode: number;
    public readonly success: boolean = false;
    public readonly timestamp: Date;
    public readonly details?: Record<string, any>;

    constructor(
        message: string,
        statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
        details?: Record<string, any>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.timestamp = new Date();
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public static badRequest(message = "Bad Request", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.BAD_REQUEST, details);
    }

    public static unauthorized(message = "Unauthorized", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.UNAUTHORIZED, details);
    }

    public static forbidden(message = "Forbidden", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.FORBIDDEN, details);
    }

    public static notFound(message = "Not Found", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.NOT_FOUND, details);
    }

    public static conflict(message = "Conflict", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.CONFLICT, details);
    }

    public static unprocessableEntity(message = "Unprocessable Entity", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.UNPROCESSABLE_ENTITY, details);
    }

    public static tooManyRequests(message = "Too Many Requests", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.TOO_MANY_REQUESTS, details);
    }

    public static internal(message = "Internal Server Error", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.INTERNAL_SERVER_ERROR, details);
    }

    public static serviceUnavailable(message = "Service Unavailable", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.SERVICE_UNAVAILABLE, details);
    }

    public static gatewayTimeout(message = "Gateway Timeout", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.GATEWAY_TIMEOUT, details);
    }

    public static success(message = "Success", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.OK, details);
    }

    public static created(message = "Successfully Created", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.CREATED, details);
    }

    public static noContent(message = "No Content", details?: Record<string, any>): ApiResHandler {
        return new ApiResHandler(message, HttpStatus.NO_CONTENT, details);
    }

    toJSON(): Record<string, any> {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            details: this.details,
            timestamp: this.timestamp.toISOString(),
        };
    }
}
