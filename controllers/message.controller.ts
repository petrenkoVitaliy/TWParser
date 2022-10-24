import { TWService } from '../modules/tw/tw.service';
import { TelegramMessage } from '../types/types';
import { Utils } from '../utils/utils';

export class MessageController {
    static async handleMessage(message: TelegramMessage) {
        if (!Utils.isValidUrl(message.text)) {
            throw new Error('Not valid url');
        }

        // gateway here...
        return TWService.handleTwMessage(message.text);
    }
}
