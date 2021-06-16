export class AppException implements Error {
    public readonly name: string;

    constructor(public readonly message: string, public readonly code: number) {}
}

export class InvalidArgumentsException extends AppException {
    constructor(message: string) {
        super(message, 400);
    }
}

export class ItemNotFoundException extends AppException {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ItemAlreadyExistException extends AppException {
    constructor(message: string) {
        super(message, 409);
    }
}

export class SecurityException extends AppException {}

export class AuthenticationException extends SecurityException {
    constructor(message: string) {
        super(message, 401);
    }
}

export class AuthorizationException extends SecurityException {
    constructor(message: string) {
        super(message, 403);
    }
}

export class MissingRouteException extends AppException {
    constructor(message: string) {
        super(message, 404);
    }
}
