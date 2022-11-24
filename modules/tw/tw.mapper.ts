import { ComposedTWDetails } from '../../types/types';
import { Utils } from '../../utils/utils';

export class TWMapper {
    static toResponseMessages(twDetails: ComposedTWDetails) {
        const initialResponseMessage = [
            { path: 'url', label: 'uri' },
            { path: 'user', label: 'user' },
            { path: 'text', label: 'message' },
            { path: 'video.viewCount', label: 'views' },
        ].reduce<string>((acc, { path, label }) => {
            const detail = Utils.getValue(twDetails, path);

            if (detail) {
                acc += `*${label}:* ${String(detail)?.replaceAll(
                    '_',
                    '\\_'
                )}\n\n`; // TODO utils
            }

            return acc;
        }, '');

        const videoResponseMessages = (twDetails.video?.variants || []).reduce<
            string[]
        >((acc, variant) => {
            acc.push(
                `[video ${variant.size}](${variant.src})\n[source](${twDetails.url})`
            );

            return acc;
        }, []);

        return [initialResponseMessage, ...videoResponseMessages];
    }
}
