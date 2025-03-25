export type UserFormType = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type Errors = {
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
};
