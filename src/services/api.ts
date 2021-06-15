import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({
	baseURL: REACT_APP_BASE_URL,
});

export interface ApiResponse {
	status: number;
	data?: any;
	error?: boolean;
	message?: any;
}

export async function getApi(
	url: string,
	params?: object,
): Promise<ApiResponse> {
	// setLoader(true);
	// clearNotificationsValidate();

	// const token = await authToken();

	try {
		const response = await api.get(`/${url}`, {
			headers: {
				'X-Api-Key': '2874d7ef-b087-4391-aa6c-e47cbba754a2',
				'Access-Control-Allow-Origin': '*',
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			}
			,
		});

		return response;
	} catch (error) {
		// const errorResponse = await handleFailed(error);

		console.log('error', error)

		return { status: 0, error: true, message: 'Custom or server error message' };
	} finally {
		// setLoader(false);
	}
}

export default api;
