import {Appearance, Image, Text, TouchableOpacity, View} from 'react-native';
import Card from '@/utils/ui/Card';
import React from 'react';
import '@/i18n/i18n';
import type {ThemeColor} from '@/utils/color/color.ts';
import {StyleSheet} from 'react-native';
import CommonModule from '@/modules/NativeCommonModule.ts';
import {useTranslation} from 'react-i18next';

interface ScoreCalcViewGoToGithubCardParams {
  color: ThemeColor;
  showDevMode: () => void;
}

const ScoreCalcViewGoToGithubCard = ({
  color,
  showDevMode,
}: ScoreCalcViewGoToGithubCardParams) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => {
        CommonModule.openUrl('https://github.com/whu-ham/ScoreCalculator');
      }}
      onLongPress={() => {
        showDevMode();
      }}>
      <Card>
        <View style={styles.container}>
          <Image
            source={
              Appearance.getColorScheme() === 'dark'
                ? require('@/resources/images/github_light.png')
                : require('@/resources/images/github.png')
            }
            style={styles.githubIcon}
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                {
                  color: color.ham_text_primary,
                },
                styles.title,
              ]}>
              {t('scorecalc.github.title')}
            </Text>
            <Text style={{color: color.ham_text_secondary}}>
              {t('scorecalc.github.subtitle')}
            </Text>
          </View>
          <View style={styles.grow} />
          <Image
            style={[
              styles.arrowRightIcon,
              {
                tintColor: color.ham_blue,
              },
            ]}
            source={require('@/resources/images/arrow_right.png')}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowRightIcon: {
    height: 16,
    width: 16,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  githubIcon: {
    height: 32,
    width: 32,
  },
  grow: {
    flexGrow: 1,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
  },
});

export default ScoreCalcViewGoToGithubCard;
