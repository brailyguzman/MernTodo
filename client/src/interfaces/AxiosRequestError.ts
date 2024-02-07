export default interface AxiosRequestError {
    response: {
        data: {
            message: string;
            error: string;
        };

        status: number;
    };
}
