import React from 'react';
import '@/i18n/i18n';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {useColor} from '@/utils/color/color';
import type {
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native/Libraries/Types/CoreEventTypes';
import type {ScoreCalcItem} from '@/business/education/scorecalc/type.ts';
import {useTranslation} from 'react-i18next';

interface CellParam {
  item: ScoreCalcItem;
  listItem: ScoreCalcItem | undefined;
  style?: StyleProp<ViewStyle>;
}

const MAX_DESC_LINE = 16;

const ScoreCalcViewDescCell = ({
  item,
  listItem,
  style,
}: CellParam): React.ReactElement => {
  const {t} = useTranslation();
  const color = useColor();
  const [descLine, setDescLine] = React.useState<number>(0);
  const [showFullDesc, setShowFullDesc] = React.useState(false);
  const onDescLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    setDescLine(event.nativeEvent.lines.length);
  };

  const canUpdate = listItem && item.version !== listItem?.version;
  return (
    <View style={style}>
      <Text
        style={[{color: color.ham_text_primary}, styles.title]}
        numberOfLines={2}>
        {item.title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: color.ham_text_secondary,
        }}>
        {item.date} · {item.author}
      </Text>
      <View>
        {canUpdate && (
          <Text
            style={[
              {
                color: color.ham_text_primary,
              },
              styles.desc,
            ]}>
            {t('scorecalc.desc.update_log')}
            {'\n'}
            {listItem?.updateBrief}
          </Text>
        )}
        <Text
          style={[
            {
              color: color.ham_text_primary,
            },
            styles.desc,
          ]}
          numberOfLines={showFullDesc ? undefined : MAX_DESC_LINE}
          onTextLayout={onDescLayout}>
          {canUpdate ? listItem?.desc : item.desc}
        </Text>
      </View>
      {descLine > MAX_DESC_LINE - 1 && (
        <Text
          style={[
            {
              color: color.ham_blue,
            },
            styles.more,
          ]}
          onPress={() => setShowFullDesc(!showFullDesc)}>
          {showFullDesc
            ? t('scorecalc.desc.collapse')
            : t('scorecalc.desc.more')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  desc: {
    fontSize: 14,
    marginTop: 8,
  },
  more: {
    marginTop: 4,
  },
  title: {
    fontSize: 16,
  },
});

export default ScoreCalcViewDescCell;
