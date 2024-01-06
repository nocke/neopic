import path from 'path'
import type { ForgeConfig } from '@electron-forge/shared-types'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'
import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerDMG } from '@electron-forge/maker-dmg'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { VitePlugin } from '@electron-forge/plugin-vite'

const config: ForgeConfig = {
    packagerConfig: {
        executableName: 'neopic',
        asar: true,
        icon: path.join(__dirname, 'src/img/icons/icon')
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            name: 'neopic',
            authors: 'Frank Author',
            setupIcon: path.join(__dirname, 'src/img/icons/icon.ico')
        }),
        new MakerDMG({}),
        new MakerZIP({}, ['linux', 'darwin']),
        new MakerRpm({
            options: {
                icon: path.join(__dirname, 'src/img/icons/icon_512×512.png')
            }
        }),
        new MakerDeb({
            options: {
                icon: path.join(__dirname, 'src/img/icons/icon_512×512.png')
            }
        })
    ],
    plugins: [
        new VitePlugin({
            // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
            build: [
                {
                    // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
                    entry: 'src/main.ts',
                    config: 'vite.main.config.mts'
                },
                {
                    entry: 'src/preload.ts',
                    config: 'vite.preload.config.mts'
                }
            ],
            renderer: [
                {
                    name: 'main_window',
                    config: 'vite.renderer.config.mts'
                }
            ]
        }),
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {}
        }
    ]
}

export default config
