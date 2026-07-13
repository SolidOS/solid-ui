import { withProvider, getThemeColors } from '@/storybook'

import '@/styles/theme.css'

export const tags = ['autodocs']
export const decorators = [withProvider]
export const parameters = {
    docs: {
        source: {
            excludeDecorators: true,
            transform(code) {
                const MAX_LINE_LENGTH = 120;
                const lines = code.trim().split('\n');
                const formattedLines = lines.map(line => {
                    if (line.length <= MAX_LINE_LENGTH) {
                        return line;
                    }

                    const baseIndentMatch = line.match(/^\s*/);
                    const baseIndent = baseIndentMatch ? baseIndentMatch[0] : '';
                    const attrIndent = baseIndent + '  ';
                    const formattedLine = line.replace(/ ([a-z0-9-]+=")/gi, `\n${attrIndent}$1`);

                    if (formattedLine !== line) {
                        return formattedLine.replace(/>(<\/[a-z0-9-]+>)$/i, `\n${baseIndent}>$1`);
                    }

                    return formattedLine;
                });

                return formattedLines.filter(line => line.trim() !== '').join('\n');
            }
        }
    }
}
export const globalTypes = {
  primaryColor: {
    description: 'Primary Color',
    defaultValue: 'purple',
    toolbar: {
      title: 'Primary',
      icon: 'paintbrush',
      items: getThemeColors().map((color) => ({ label: color.slice(0, 1).toUpperCase() + color.slice(1), value: color })),
      dynamicTitle: true,
    },
  },
};
