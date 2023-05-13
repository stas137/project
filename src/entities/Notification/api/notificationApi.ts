import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationList: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
        // params: {
        //   _limit: limit,
        // },
      }),
    }),
  }),
});

export const useGetNotificationList =
  notificationApi.useGetNotificationListQuery;
