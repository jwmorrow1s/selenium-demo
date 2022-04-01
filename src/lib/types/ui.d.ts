declare type ImageRef = {
    ref: string;
    title: string;
};

declare type DOMInitialization<_T = string> = void;

export const { ImageRef, DOMInitialization };