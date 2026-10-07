import { registerCustomTheme } from '@pierre/diffs';

interface SyntaxPalette {
    background: string;
    foreground: string;
    addition: string;
    deletion: string;
    modified: string;
    keyword: string;
    string: string;
    func: string;
    type: string;
    constant: string;
    comment: string;
    punctuation: string;
}

// Paper and ink. Keyword violet, string olive, function prussian blue,
// type teal and constant sienna stay clear of the green and red diff tints.
const PROOF_LIGHT: SyntaxPalette = {
    background: '#fffdfa',
    foreground: '#1d222a',
    addition: '#1f8959',
    deletion: '#c13e2e',
    modified: '#bd871c',
    keyword: '#693996',
    string: '#685b00',
    func: '#005888',
    type: '#006a6a',
    constant: '#a04400',
    comment: '#736a5f',
    punctuation: '#535861',
};

const PROOF_DARK: SyntaxPalette = {
    background: '#1c1915',
    foreground: '#e5e1d7',
    addition: '#5abb88',
    deletion: '#e66f62',
    modified: '#e4b65c',
    keyword: '#c19fe9',
    string: '#c6c17c',
    func: '#7cbde7',
    type: '#7ecfc7',
    constant: '#eba16e',
    comment: '#999185',
    punctuation: '#a9a49c',
};

function createTheme(name: string, type: 'light' | 'dark', p: SyntaxPalette) {
    return {
        name,
        type,
        colors: {
            'editor.background': p.background,
            'editor.foreground': p.foreground,
            'gitDecoration.addedResourceForeground': p.addition,
            'gitDecoration.deletedResourceForeground': p.deletion,
            'gitDecoration.modifiedResourceForeground': p.modified,
        },
        tokenColors: [
            { settings: { foreground: p.foreground } },
            {
                scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
                settings: { foreground: p.comment, fontStyle: 'italic' },
            },
            {
                scope: [
                    'keyword',
                    'storage',
                    'storage.type',
                    'storage.modifier',
                    'keyword.operator.new',
                    'keyword.operator.expression',
                    'keyword.operator.logical.python',
                    'variable.language',
                ],
                settings: { foreground: p.keyword },
            },
            {
                scope: ['string', 'string.template', 'punctuation.definition.string', 'markup.inline.raw', 'string.regexp'],
                settings: { foreground: p.string },
            },
            {
                scope: ['constant.character.escape', 'punctuation.definition.template-expression', 'punctuation.section.embedded'],
                settings: { foreground: p.keyword },
            },
            {
                scope: [
                    'entity.name.function',
                    'support.function',
                    'meta.function-call entity.name.function',
                    'variable.function',
                    'entity.name.tag',
                    'markup.heading',
                ],
                settings: { foreground: p.func },
            },
            {
                scope: [
                    'entity.name.type',
                    'entity.name.class',
                    'entity.other.inherited-class',
                    'support.type',
                    'support.class',
                    'entity.name.namespace',
                    'entity.other.attribute-name',
                    'meta.type.annotation entity.name.type',
                ],
                settings: { foreground: p.type },
            },
            {
                scope: [
                    'constant',
                    'constant.numeric',
                    'constant.language',
                    'support.constant',
                    'variable.other.constant',
                    'variable.other.enummember',
                    'markup.bold',
                ],
                settings: { foreground: p.constant },
            },
            {
                scope: ['punctuation', 'meta.brace', 'keyword.operator', 'punctuation.separator', 'punctuation.terminator'],
                settings: { foreground: p.punctuation },
            },
            {
                scope: ['support.type.property-name', 'meta.object-literal.key', 'variable.other.property', 'variable.other.object.property'],
                settings: { foreground: p.foreground },
            },
            { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
            { scope: ['markup.inserted'], settings: { foreground: p.addition } },
            { scope: ['markup.deleted'], settings: { foreground: p.deletion } },
            { scope: ['markup.underline.link', 'string.other.link'], settings: { foreground: p.func } },
        ],
    };
}

export const SYNTAX_THEMES = { dark: 'proof-dark', light: 'proof-light' } as const;

registerCustomTheme(SYNTAX_THEMES.light, async () => createTheme(SYNTAX_THEMES.light, 'light', PROOF_LIGHT));
registerCustomTheme(SYNTAX_THEMES.dark, async () => createTheme(SYNTAX_THEMES.dark, 'dark', PROOF_DARK));
