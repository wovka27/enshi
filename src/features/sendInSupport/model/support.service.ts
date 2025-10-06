import { toast } from '@entities/app-toast/lib';
import { client } from '@shared/api';

class SupportService {
  async sendMessage(message: string) {
    const response = await client.post<
      { ok: boolean; message: string },
      { ok: boolean; message: string },
      { message: string }
    >({
      url: 'support/message',
      payload: { message },
      defaultValue: { ok: true, message: 'Сообщение отправлено!' },
    });

    if (response.data?.ok) {
      toast({
        title: 'Успех',
        text: response.data.message,
        timeout: 5000,
        type: 'success',
      });
    }
  }
}

const supportsService = new SupportService();

export default supportsService;
