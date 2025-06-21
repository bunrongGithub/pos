export class HttpStatus {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly NO_CONTENT = 204;

  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly METHOD_NOT_FOUND = 405;
  static readonly CONFLICT = 409;

  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly BAD_GATEWAY = 502;
  static readonly SERVICE_UNAVAILABLE = 503;
}
