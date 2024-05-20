export interface Ilogin {
    email: string,
    password: string
}

export interface ISignup {
    email: string,
    password: string,
    username: string
}

export interface IOtpVerify {
    email: string,
    otp: string
}