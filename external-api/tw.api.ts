import axios from 'axios';

import { TWDetailsResponse } from '../types/types';

export default {
    getTweetResult: async (twId: string) => {
        try {
            const response = await axios.get(
                `https://cdn.syndication.twimg.com/tweet-result?id=${twId}`
            );

            if (!response.data) {
                throw new Error('Empty tweet response');
            }

            return response.data as TWDetailsResponse;
        } catch (ex) {
            console.error(ex);

            throw new Error('Cannot find tweet');
        }
    },
};
