import { ComposedTWDetails, TWDetailsResponse } from '../../types/types';

import { Utils } from '../../utils/utils';
import twApi from '../../external-api/tw.api';

export class TWParser {
    private static allowedVideoTypes: { [key: string]: boolean | undefined } = {
        'video/mp4': true,
    };

    static async parseDetails(message: string) {
        const twId = Utils.getTwIdFromUrl(message);

        if (!twId) {
            throw new Error('Cannot parse tweet id');
        }

        const twDetails = await this.getTwDetails(twId);

        console.log(JSON.stringify(twDetails, null, 2));

        return twDetails;
    }

    private static async getTwDetails(
        twId: string
    ): Promise<ComposedTWDetails> {
        const twDetails = await twApi.getTweetResult(twId);

        const video = this.getVideoDetails(twDetails);

        const composedTwDetails = {
            video,
            url: `https://twitter.com/${twDetails.user.screen_name}/status/${twId}`,
            user: `${twDetails.user.name} aka ${twDetails.user.screen_name}`,
            text: twDetails.text,
        };

        return composedTwDetails;
    }

    private static getVideoDetails(twDetails: TWDetailsResponse) {
        return twDetails.video
            ? {
                  viewCount: twDetails.video.viewCount,
                  variants: (twDetails.video.variants || []).reduce<
                      { size: string; src: string; type: string }[]
                  >((acc, variant) => {
                      if (this.allowedVideoTypes[variant.type]) {
                          const size = Utils.getVideoSize(variant.src);

                          acc.push({
                              size: size || 'unknown size',
                              src: variant.src,
                              type: variant.type,
                          });
                      }

                      return acc;
                  }, []),
              }
            : null;
    }
}
