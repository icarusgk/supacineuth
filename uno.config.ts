// uno.config.ts
import { defineConfig, presetWind, presetIcons } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'

export default defineConfig({
  presets: [
    presetWind(),
    presetDaisy({
      themes: false
    }),
    presetIcons(
      {
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
        }
      }
    )
  ],
  shortcuts: {
    'pointer': 'hover:cursor-pointer active:cursor-pointer focus:cursor-pointer'
  }
})