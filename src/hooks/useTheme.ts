import {
  Common,
  Fonts,
  Gutters,
  Images,
  Layout,
  DefaultVariables,
} from '../theme';
import {
  ThemeVariables,
  Theme,
  ThemeNavigationColors,
} from '../../@types/theme';

export default function () {
  // Get the scheme device

  let variables = {};
  let partialTheme = {};
  let darkVariables = {};
  let partialDarkTheme = {};

  const themeVariables = mergeVariables(variables, darkVariables);

  const fonts = Fonts(themeVariables);
  const gutters = Gutters(themeVariables);
  const images = Images(themeVariables);
  const layout = Layout(themeVariables);
  const common = Common({
    ...themeVariables,
    Layout: Layout(themeVariables),
    Gutters: Gutters(themeVariables),
    Fonts: Fonts(themeVariables),
    Images: Images(themeVariables),
  });

  // Build the default theme
  const baseTheme: Theme<
    typeof fonts,
    typeof gutters,
    typeof images,
    typeof layout,
    typeof common
  > = {
    Fonts: fonts,
    Gutters: gutters,
    Images: images,
    Layout: layout,
    Common: common,
    ...themeVariables,
  };

  // Merge and return the current Theme
  return buildTheme(
    baseTheme,
    formatTheme(themeVariables, partialTheme || {}),
    formatTheme(themeVariables, partialDarkTheme || {}),
  );
}

/**
 * Generate Theme with theme variables
 */
const formatTheme = <F, G, I, L, C>(
  variables: ThemeVariables,
  theme: Partial<Theme<F, G, I, L, C>>,
) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: (generate as any)(variables),
    };
  }, theme);
};

/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeVariables = (
  themeConfig: Partial<ThemeVariables>,
  darkThemeConfig: Partial<ThemeVariables>,
) => {
  return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
    const theme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (themeConfig as any)[group];
    const darkTheme:
      | Record<keyof typeof DefaultVariables, typeof vars>
      | undefined = (darkThemeConfig as any)[group];

    return {
      ...acc,
      [group]: {
        ...vars,
        ...(theme || {}),
        ...(darkTheme || {}),
      },
    };
  }, DefaultVariables);
};

/**
 * Provide all the theme exposed with useTheme()
 */
const buildTheme = <F, G, I, L, C>(
  baseTheme: Theme<F, G, I, L, C>,
  themeConfig: Partial<Theme<F, G, I, L, C>>,
  darkThemeConfig: Partial<Theme<F, G, I, L, C>>,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    NavigationTheme: mergeNavigationTheme(baseTheme.NavigationColors),
  };
};

/**
 * Merge theme from baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeTheme = <F, G, I, L, C>(
  baseTheme: Theme<F, G, I, L, C>,
  theme: Partial<Theme<F, G, I, L, C>>,
  darkTheme: Partial<Theme<F, G, I, L, C>>,
) =>
  Object.entries(baseTheme).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...((value as any) || {}),
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    baseTheme,
  ) as typeof baseTheme;

/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 * @return {{colors}}
 */
const mergeNavigationTheme = (
  overrideColors: Partial<ThemeNavigationColors>,
) => ({
  colors: {
    ...overrideColors,
  },
});
