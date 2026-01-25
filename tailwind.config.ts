import typographyPlugin from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';

import typographyStyles from './typography';

export default {
    plugins: [typographyPlugin],
    theme: {
        typography: typographyStyles,
    },
} satisfies Config;
