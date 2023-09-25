import axios from 'axios';

import { TWDetailsResponse } from '../types/types';

const SYNDICATION_URL = 'https://cdn.syndication.twimg.com';

function getTweetToken(id: string) {
    return ((Number(id) / 1e15) * Math.PI)
        .toString(6 ** 2)
        .replace(/(0+|\.)/g, '');
}

const API_FEATURES = [
    'tfw_timeline_list:',
    'tfw_follower_count_sunset:true',
    'tfw_tweet_edit_backend:on',
    'tfw_refsrc_session:on',
    'tfw_show_business_verified_badge:on',
    'tfw_duplicate_scribes_to_settings:on',
    'tfw_show_blue_verified_badge:on',
    'tfw_legacy_timeline_sunset:true',
    'tfw_show_gov_verified_badge:on',
    'tfw_show_business_affiliate_badge:on',
    'tfw_tweet_edit_frontend:on',
    'tfw_use_profile_image_shape_enabled:on',
    'tfw_fosnr_soft_interventions_enabled:on',
    'tfw_show_birdwatch_pivots_enabled:on',
];

export default {
    getTweetResult: async (twId: string) => {
        try {
            const url = new URL(`${SYNDICATION_URL}/tweet-result`);

            url.searchParams.set('id', twId);
            url.searchParams.set('token', getTweetToken(twId));
            url.searchParams.set('features', API_FEATURES.join(';'));

            console.log(`${twId} : ${getTweetToken(twId)}\n`);

            const response = await axios.get(
                `${SYNDICATION_URL}/tweet-result?id=${twId}`
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
