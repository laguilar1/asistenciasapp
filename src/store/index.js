// Utilities
import { createPinia } from 'pinia' //original
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'

localforage.config({
    driver      : localforage.INDEXEDB, // Force WebSQL; same as using setDriver()
    name        : 'pwasistencias',
    storeName   : 'datapwa',               // Should be alphanumeric, with underscores.
    description : 'Data from pwasistencias'
});

const pinia = createPinia()
const installPersistedStatePlugin = createPersistedStatePlugin({
    // serialize: (value) => stringify(value),
    storage: {
      getItem: async (key) => {
        return localforage.getItem(key)
      },
      setItem: async (key, value) => {
        return localforage.setItem(key, value)
      },
      removeItem: async (key) => {
        return localforage.removeItem(key)
      },
    },
  })
pinia.use((context) => installPersistedStatePlugin(context))



// export default createPinia()
export default pinia //original
