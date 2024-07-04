import { Node, Command } from '@tiptap/react';
import { getEmbedURL } from './mappers/get-embed-url';

export interface IframeOptions {
    allowFullscreen: boolean,
    HTMLAttributes: {
        [key: string]: any
    },
}

declare module '@tiptap/react' {
    interface Commands<ReturnType> {
        iframe: {
            setIframe: (options: { src: string }) => ReturnType,
        }
    }
}

export const IframePlugin = Node.create<IframeOptions>({
    name: 'iframe',
    group: 'block',
    atom: true,
    addOptions() {
        return {
            allowFullscreen: true,
            HTMLAttributes: {
                class: 'iframe-wrapper'
            },
        }
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
            frameborder: {
                default: 0,
            },
            width: {
                default: "100%",
            },
            allowfullscreen: {
                default: this.options.allowFullscreen,
                parseHTML: () => this.options.allowFullscreen,
            },
        }
    },
    parseHTML() {
        return [{
            tag: 'iframe',
        }]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', {
            style: `width: 100%; height: 0; padding-bottom: 56.25%; position: relative;`
        },
            ['iframe', {
                ...this.options.HTMLAttributes,
                ...HTMLAttributes,
                style: `width: 100%; height: 100%; position: absolute; inset: 0;`
            }]
        ]
    },
    addCommands() {
        return {
            setIframe: (options: { src: string }) => ({ tr, dispatch }) => {
                const embedURL = getEmbedURL(options.src);
                if (embedURL) {
                    options.src = embedURL
                }
                const node = this.type.create(options);
                if (dispatch) {
                    tr.replaceRangeWith(tr.selection.from, tr.selection.to, node)
                }
                return true;
            },
        }
    },
})