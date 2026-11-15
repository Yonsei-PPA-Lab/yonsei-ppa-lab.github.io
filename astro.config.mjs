import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yonsei-ppa-lab.github.io',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
      langAlias: { systemverilog: 'system-verilog', sv: 'system-verilog' },
    },
  },
});
