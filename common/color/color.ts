/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 14:37
 */
import {Appearance, ColorValue} from 'react-native';
import {useEffect, useState} from 'react';
import AppearanceListener = Appearance.AppearanceListener;

interface ThemeColor {
  ham_red: ColorValue;
  ham_orange: ColorValue;
  ham_yellow: ColorValue;
  ham_green: ColorValue;
  ham_mint: ColorValue;
  ham_teal: ColorValue;
  ham_cyan: ColorValue;
  ham_blue: ColorValue;
  ham_indigo: ColorValue;
  ham_purple: ColorValue;
  ham_pink: ColorValue;
  ham_brown: ColorValue;
  ham_gray: ColorValue;
  ham_text_primary: ColorValue;
  ham_text_secondary: ColorValue;
  ham_bg_b1: ColorValue;
  ham_bg_b2: ColorValue;
  ham_divider: ColorValue;
  ham_lightGray: ColorValue;
  ham_lightBlue: ColorValue;
}

const lightColor: ThemeColor = {
  ham_red: '#FF3B30',
  ham_orange: '#FF9500',
  ham_yellow: '#FFCC00',
  ham_green: '#34C759',
  ham_mint: '#00C7BE',
  ham_teal: '#30B3C7',
  ham_cyan: '#32ADE6',
  ham_blue: '#007AFF',
  ham_indigo: '#5856D6',
  ham_purple: '#AF52DE',
  ham_pink: '#FF2D55',
  ham_brown: '#A2845E',
  ham_gray: '#8E8E93',
  ham_text_primary: 'black',
  ham_text_secondary: 'gray',
  ham_bg_b1: '#F9F9F9FF',
  ham_bg_b2: 'white',
  ham_divider: '#F4F4F4',
  ham_lightGray: '#EDEEEF',
  ham_lightBlue: '#E6F1FF',
};

const darkColor: ThemeColor = {
  ham_red: '#FF453A',
  ham_orange: '#FF9F0A',
  ham_yellow: '#FFD60A',
  ham_green: '#30D158',
  ham_mint: '#63E6E2',
  ham_teal: '#40C8E0',
  ham_cyan: '#64D2FF',
  ham_blue: '#0A84FF',
  ham_indigo: '#5E5CE6',
  ham_purple: '#BF5AF2',
  ham_pink: '#FF375F',
  ham_brown: '#AC8E68',
  ham_gray: '#98989D',
  ham_text_primary: 'white',
  ham_text_secondary: 'gray',
  ham_bg_b1: '#000000',
  ham_bg_b2: '#0f1010FF',
  ham_divider: '#0C0C0C',
  ham_lightGray: '#0F0E0F',
  ham_lightBlue: '#010D18',
};

const useColor = () => {
  const [color, setColor] = useState<ThemeColor>(
    Appearance.getColorScheme() === 'dark' ? darkColor : lightColor,
  );
  useEffect(() => {
    const changeListener: AppearanceListener = prep => {
      setColor(prep.colorScheme === 'dark' ? darkColor : lightColor);
    };
    Appearance.addChangeListener(changeListener);
  }, []);
  return color;
};

export {useColor};
export type {ThemeColor};
