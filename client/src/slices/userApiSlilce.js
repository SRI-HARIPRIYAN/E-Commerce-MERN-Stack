import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: "POST",
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/register`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "GET",
			}),
		}),
		forgotPassword: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/forgot-password`,
				method: "POST",
				body: data,
			}),
		}),
		resetPassword: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/reset-password/${data.resetToken}`,
				method: "PATCH",
				body: data,
			}),
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/update`,
				method: "PUT",
				body: data,
			}),
		}),
		getUsers: builder.query({
			query: () => ({
				url: USERS_URL,
				method: "GET",
			}),
			keepUnusedDataFor: 5,
		}),
		updateUserByAdmin: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useUpdateUserMutation,
	useGetUsersQuery,
	useUpdateUserByAdminMutation,
} = userApiSlice;
