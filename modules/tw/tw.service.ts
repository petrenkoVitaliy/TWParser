import { TWMapper } from './tw.mapper';
import { TWParser } from './tw.parser';

export class TWService {
    static async handleTwMessage(message: string) {
        const twDetails = await TWParser.parseDetails(message);

        return TWMapper.toResponseMessages(twDetails);
    }
}
