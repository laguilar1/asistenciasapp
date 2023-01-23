import { computed } from 'vue';
import { useTheme } from 'vuetify'

const useMode = () => {

  const theme = useTheme()

  const toggleTheme = () => {
    setLocalStorageTheme();
    theme.global.name.value =
      theme.global.current.value.dark ? 'light'
        : 'dark'
  }

  const themeIcon = computed(() => {
    setLocalStorageTheme();
    return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
  })

  const themeIconText = computed(() => {
    return theme.global.current.value.dark ? 'Modo Claro' : 'Modo Oscuro'
  })

  const setLocalStorageTheme = () => {
    const currentTheme = theme.global.current.value.dark ? 'dark'
      : 'light'
    localStorage.setItem('theme', currentTheme);
  }

  return {
    toggleTheme,
    themeIcon,
    themeIconText,
  }
}

export default useMode
