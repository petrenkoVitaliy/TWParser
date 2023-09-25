export const Utils = {
    isValidUrl: (possibleUrl = '') => {
        const httpRegex =
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

        return httpRegex.test(possibleUrl);
    },

    getTwIdFromUrl: (url: string) => {
        return url.match(/status\/\d+/gm)?.[0]?.split('status/')?.[1];
    },

    getVideoSize: (videoSrc: string) => {
        return videoSrc.match(/\d+x\d+/gm)?.[0];
    },

    getValue: (obj: any, path: string | string[]) => {
        const properties = Array.isArray(path) ? path : path.split('.');

        return properties.reduce((acc, subPath) => acc?.[subPath], {
            ...obj,
        }) as string | number;
    },

    formatResponseMessageDetail: (label: string, detail: string) => {
        return `*${label}:* ${detail?.replaceAll('_', '\\_')}\n\n`;
    },
};
