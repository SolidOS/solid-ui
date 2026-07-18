export type ControlOptions<TLabel extends string = string, TValue = unknown> = [TLabel, TValue][];
export type GetStoryArgs<T extends object> = {
    [K in keyof T]: T[K] extends {
        options: ArrayLike<infer TValue>;
    } ? TValue : T[K] extends {
        control: 'text';
    } ? string : never;
};
export declare const withProvider: (story: import('storybook/internal/csf').PartialStoryFn<import('@storybook/web-components').WebComponentsRenderer, import('@storybook/web-components').StrictArgs>, context: import('storybook/internal/csf').StoryContext<import('@storybook/web-components').WebComponentsRenderer, import('@storybook/web-components').StrictArgs>) => import('lit-html').TemplateResult<1>;
export declare function getThemeColors(): string[];
export declare function defineControlOptions<const T extends ControlOptions>(options: T): {
    control: {
        type: string;
        options: T[number][0][];
    };
    resolve(value: T[number][0]): T[number][1];
};
//# sourceMappingURL=helpers.d.ts.map