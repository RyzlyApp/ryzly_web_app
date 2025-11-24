import { BaseRepository } from "@/dal";
import { RepositoryPayload } from "@/modules/general/Repository-payload";
import { ENDPOINTS } from "@/modules/general/endpoints";
import { INotificationQueryDto } from "../dto/notificationQueryDto";
import { IMarkAsReadDto } from "../dto/markAsReadDto";
import { GeneralResponse } from "@/modules/general/General-response";
import { INotificationModel } from "../models/NotificationModel";

export class NotificationRepository extends BaseRepository {
  private notificationEndpoint = ENDPOINTS.notification;

  public async getUserNotification(
    payload: RepositoryPayload<null, INotificationQueryDto>
  ): Promise<GeneralResponse<INotificationModel[]>> {
    const response = await this.httpClient.get(this.notificationEndpoint.get, {
      params: {
        page: payload.params?.page,
        limit: payload.params?.limit,
      },
    });

    return response?.data;
  }

  public async markAsRead(
    payload: RepositoryPayload<IMarkAsReadDto, null>
  ): Promise<GeneralResponse<any>> {
    const response = await this.httpClient.patch(
      this.notificationEndpoint.markAsRead,
      payload.body
    );
    return response.data;
  }
}

export default new NotificationRepository();
