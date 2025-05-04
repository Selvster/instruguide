import { client } from './client';
export const get_instruments = async () => {
    try {
        const response = await client({
            url: '/instruments',
            method: 'GET'
        });

        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        throw new Error(
            error.response?.data?.message ||
            `Request failed with status ${error.response?.status || 'unknown'}`
        );
    }
};
