import {Appearance, Image, Text, TouchableOpacity, View} from 'react-native';
import Card from '../../../common/ui/Card.tsx';
import React from 'react';
import {ThemeColor} from '../../../common/color/color.ts';
import {StyleSheet} from 'react-native';
import CommonModule from '../../../modules/CommonModule.ts';

interface ScoreCalcViewGoToGithubCardParams {
  color: ThemeColor;
  showDevMode: () => void;
}

const ScoreCalcViewGoToGithubCard = ({
  color,
  showDevMode,
}: ScoreCalcViewGoToGithubCardParams) => {
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
                ? require('../../../resources/github_light.png')
                : require('../../../resources/github.png')
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
              开发成绩计算方式
            </Text>
            <Text style={{color: color.ham_text_secondary}}>去Github提PR</Text>
          </View>
          <View style={styles.grow} />
          <Image
            style={[
              styles.arrowRightIcon,
              {
                tintColor: color.ham_blue,
              },
            ]}
            source={require('../../../resources/arrow_right.png')}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  githubIcon: {
    width: 32,
    height: 32,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
  arrowRightIcon: {
    height: 16,
    width: 16,
  },
});

export default ScoreCalcViewGoToGithubCard;
