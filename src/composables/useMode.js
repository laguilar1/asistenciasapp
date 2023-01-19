import { computed } from 'vue';
import { useTheme } from 'vuetify'

const useMode = () => {

  const theme = useTheme()

  const toggleTheme = () => {
  theme.global.name.value =
    theme.global.current.value.dark ? 'light'
      : 'dark'
  }

  const themeIcon = computed(() => {
    return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
  })

  const themeIconText = computed(() => {
    return theme.global.current.value.dark ? 'Modo Claro' : 'Modo Oscuro'
  })

  return {
    toggleTheme,
    themeIcon,
    themeIconText,
  }
}

export default useMode
