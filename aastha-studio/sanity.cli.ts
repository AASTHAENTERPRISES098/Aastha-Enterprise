import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ctud63ec',
    dataset: 'production',
  },
  /** Deploys the Studio to https://aastha.sanity.studio */
  studioHost: 'aastha',
  deployment: {autoUpdates: true, appId: 'yy6tmlt9pn9d5aqfa0m8jz30'},
})
