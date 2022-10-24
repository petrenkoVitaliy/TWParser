export type TWDetailsResponse = {
    text: string;
    user: {
        id_str: string;
        name: string;
        profile_image_url_https: string;
        screen_name: string;
        verified: boolean;
    };
    video: {
        aspectRatio: number[];
        contentType: string;
        durationMs: number;
        mediaAvailability: {
            status: string;
        };
        poster: string;
        variants: {
            type: string;
            src: string;
        }[];
        videoId: {
            type: string;
            id: string;
        };
        viewCount: number;
    };
    conversation_count: number;
    news_action_type: string;
};

export type ComposedTWDetails = {
    url: string;
    user: string;
    text: string;

    video: {
        viewCount: number;
        variants: {
            size: string;
            src: string;
            type: string;
        }[];
    } | null;
};

export type TelegramMessage = {
    message_id: number;

    from: {
        id: number;
        is_bot: boolean;
        first_name: string;
        last_name: string;
        username: string;
        language_code: string;
    };

    chat: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        type: string;
    };

    date: number;
    text: string;

    entities: {
        offset: number;
        length: number;
        type: string;
    }[];
};

export type TelegramRequest = {
    update_id: number;

    message: TelegramMessage;
};
