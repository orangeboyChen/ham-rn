/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 17:11
 */
import React from 'react';
import {
  Appearance,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Color from 'color';
import {ThemeColor} from '../../../../common/color/color.ts';
import {
  ScoreCalcItem,
  ScoreCalcItemType,
} from '../../../../business/education/scorecalc/type.ts';

interface ScoreCalcViewOtherItemCellParams {
  color: ThemeColor;
  item: ScoreCalcItem;
  currentItem: ScoreCalcItem | undefined;
  goToDetail: () => void;
  onSelect: () => void;
}

const ScoreCalcViewOtherItemCell = ({
  color,
  item,
  currentItem,
  goToDetail,
  onSelect,
}: ScoreCalcViewOtherItemCellParams): React.ReactElement => {
  const isCurrentItem =
    currentItem?.title === item.title && currentItem?.url === item.url;
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={styles.container}>
        <View
          style={[
            {
              backgroundColor: Color(color.ham_gray).alpha(0.2).hexa(),
            },
            styles.iconContainer,
          ]}>
          <Image
            source={require('../../../../resources/icon_js.png')}
            style={styles.icon}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              {
                color: color.ham_text_primary,
              },
              styles.title,
            ]}
            numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.briefContainer}>
            {item.type === ScoreCalcItemType.GITHUB ? (
              <Image
                source={
                  Appearance.getColorScheme() === 'dark'
                    ? require('../../../../resources/github_light.png')
                    : require('../../../../resources/github.png')
                }
                style={styles.githubIcon}
              />
            ) : (
              <></>
            )}

            <Text
              style={[{color: color.ham_text_secondary}, styles.brief]}
              numberOfLines={1}>
              {item.brief}
            </Text>
          </View>
        </View>

        {isCurrentItem && currentItem?.version === item.version ? (
          <Text
            style={{
              color: color.ham_text_secondary,
            }}>
            当前
          </Text>
        ) : (
          <TouchableOpacity
            style={styles.selectButtonContainer}
            onPress={onSelect}>
            <View
              style={[
                {
                  backgroundColor: Color(color.ham_gray).alpha(0.2).hexa(),
                },
                styles.selectButton,
              ]}>
              <Text
                style={{
                  color: color.ham_blue,
                }}>
                {!isCurrentItem ? '选择' : '升级'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 12,
  },
  icon: {
    height: 48,
    width: 48,
  },
  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
  },
  briefContainer: {
    marginTop: 2,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brief: {
    flexShrink: 1,
  },
  selectButtonContainer: {
    width: 46,
  },
  selectButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  githubIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
});

export default ScoreCalcViewOtherItemCell;
