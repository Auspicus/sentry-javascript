import { makeBaseNPMConfig, makeNPMConfigVariants } from '../../rollup/index.js';

export default [
  ...makeNPMConfigVariants(
    makeBaseNPMConfig({
      // We need to include `instrumentServer.ts` separately because it's only conditionally required, and so rollup
      // doesn't automatically include it when calculating the module dependency tree.
      entrypoints: ['src/index.server.ts', 'src/index.client.ts', 'src/utils/instrumentServer.ts'],

      // prevent this internal nextjs code from ending up in our built package (this doesn't happen automatially because
      // the name doesn't match an SDK dependency)
      packageSpecificConfig: { external: ['next/router'] },
    }),
  ),
  ...makeNPMConfigVariants(
    makeBaseNPMConfig({
      entrypoints: [
        'src/config/templates/prefixLoaderTemplate.ts',
        'src/config/templates/dataFetchersLoaderTemplate.ts',
      ],

      packageSpecificConfig: {
        output: {
          // Preserve the original file structure (i.e., so that everything is still relative to `src`). (Not entirely
          // clear why this is necessary here and not for other entrypoints in this file.)
          entryFileNames: 'config/templates/[name].js',

          // this is going to be add-on code, so it doesn't need the trappings of a full module (and in fact actively
          // shouldn't have them, lest they muck with the module to which we're adding it)
          sourcemap: false,
          esModule: false,
        },
        external: ['@sentry/nextjs'],
      },
    }),
  ),
  ...makeNPMConfigVariants(
    makeBaseNPMConfig({
      entrypoints: ['src/config/loaders/prefixLoader.ts'],

      packageSpecificConfig: {
        output: {
          // make it so Rollup calms down about the fact that we're doing `export { loader as default }`
          exports: 'default',

          // preserve the original file structure (i.e., so that everything is still relative to `src`)
          entryFileNames: 'config/loaders/[name].js',
        },
      },
    }),
  ),
];
