import color from './color.module.scss';

type ColorCategory = 'primary' | 'blue' | 'green' | 'red';

const COLOR: {
  light: {
    primary: { [key: string]: string };
    blue: { [key: string]: string };
    green: { [key: string]: string };
    red: { [key: string]: string };
    background: { [key: string]: string };
    text: { [key: string]: string };
  };
  dark: {
    primary: { [key: string]: string };
    blue: { [key: string]: string };
    green: { [key: string]: string };
    red: { [key: string]: string };
    background: { [key: string]: string };
    text: { [key: string]: string };
  };
  solid: { [key: string]: string };
} = {
  light: {
    primary: {
      '000': color.light_primary000,
      '100': color.light_primary100,
      '200': color.light_primary200,
      '300': color.light_primary300,
      '400': color.light_primary400,
      '500': color.light_primary500,
      '600': color.light_primary600,
      '700': color.light_primary700,
      '800': color.light_primary800,
      '900': color.light_primary900,
    },
    blue: {
      '000': color.light_blue000,
      '100': color.light_blue100,
      '200': color.light_blue200,
      '300': color.light_blue300,
      '400': color.light_blue400,
      '500': color.light_blue500,
      '600': color.light_blue600,
      '700': color.light_blue700,
    },
    green: {
      '000': color.light_green000,
      '100': color.light_green100,
      '200': color.light_green200,
      '300': color.light_green300,
      '400': color.light_green400,
      '500': color.light_green500,
      '600': color.light_green600,
      '700': color.light_green700,
    },
    red: {
      '000': color.light_red000,
      '100': color.light_red100,
      '200': color.light_red200,
      '300': color.light_red300,
      '400': color.light_red400,
      '500': color.light_red500,
      '600': color.light_red600,
      '700': color.light_red700,
      '800': color.light_red800,
      '900': color.light_red900,
    },
    background: {
      global: color.light_background,
    },
    text: {
      global: color.light_text,
    },
  },
  dark: {
    primary: {
      '000': color.dark_primary000,
      '100': color.dark_primary100,
      '200': color.dark_primary200,
      '300': color.dark_primary300,
      '400': color.dark_primary400,
      '500': color.dark_primary500,
      '600': color.dark_primary600,
      '700': color.dark_primary700,
    },
    blue: {
      '000': color.dark_blue000,
      '100': color.dark_blue100,
      '200': color.dark_blue200,
      '300': color.dark_blue300,
      '400': color.dark_blue400,
      '500': color.dark_blue500,
      '600': color.dark_blue600,
      '700': color.dark_blue700,
    },
    green: {
      '000': color.dark_green000,
      '100': color.dark_green100,
      '200': color.dark_green200,
      '300': color.dark_green300,
      '400': color.dark_green400,
      '500': color.dark_green500,
      '600': color.dark_green600,
      '700': color.dark_green700,
    },
    red: {
      '000': color.dark_red000,
      '100': color.dark_red100,
      '200': color.dark_red200,
      '300': color.dark_red300,
      '400': color.dark_red400,
      '500': color.dark_red500,
      '600': color.dark_red600,
      '700': color.dark_red700,
    },
    background: {
      global: color.dark_background,
    },
    text: {
      global: color.dark_text,
    },
  },
  solid: {
    white: color.white,
    black: color.black,
  },
};

export type { ColorCategory };
export { COLOR };
