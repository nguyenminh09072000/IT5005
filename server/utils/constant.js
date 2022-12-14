export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

export const API_STATUS = {
    SUCCESS: 0,
    AUTH_ERROR: 1,
    INVALID_PARAM: 2,
    DATABASE_ERROR: 3,
    MAIL_ERROR: 4,
    OTHER_ERROR: 5,
};

export const DAYS = {
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
};

export const ROLES = {
    ADMIN: 'admin',
    STUDENT: 'student',
    TEACHER: 'teacher',
};

export const ACCESS_TOKEN_EXPIRED_TIME = 7200000; // in second,7200000 for test, should be 7200
