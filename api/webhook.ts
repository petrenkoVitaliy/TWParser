import { TelegramRequest } from 'types/types';
import TelegramBot from 'node-telegram-bot-api';

import { MessageController } from '../controllers/message.controller';

export default async function handleTelegramMessage(
    request: { body: TelegramRequest },
    response: { send: (status: string) => void }
) {
    try {
        const token = process.env.TELEGRAM_KEY;

        if (!token) {
            console.error('Token is required');

            return;
        }

        const bot = new TelegramBot(token);

        const { body } = request;

        if (body.message) {
            const {
                chat: { id },
            } = body.message;

            try {
                const responseMessages = await MessageController.handleMessage(
                    body.message
                );

                for (let responseMessage of responseMessages) {
                    await bot.sendMessage(id, responseMessage, {
                        parse_mode: 'Markdown',
                    });
                }
            } catch (ex) {
                await bot.sendMessage(id, ex.toString());

                throw ex;
            }
        }
    } catch (ex) {
        console.error(ex);
    }

    response.send('OK');
}
