import { client } from './client';
export const get_instrument = async (id : string) => {
    try {
        const response = await client({
            url: `/instruments/${id}`,
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
