export type UserFormType = {
    username: string;
    password: string;
    passwordConfirm: string;
};

export type Errors = {
    username?: string;
    password?: string;
    passwordConfirm?: string;
};
