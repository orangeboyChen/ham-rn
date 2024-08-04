import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {useColor} from '../../../common/color/color.ts';
import {
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native/Libraries/Types/CoreEventTypes';
import {ScoreCalcItem} from '../../../business/education/scorecalc/type.ts';

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
            【更新日志】{'\n'}
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
          {showFullDesc ? '收起' : '更多...'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  desc: {
    fontSize: 14,
    marginTop: 8,
  },
  more: {
    marginTop: 4,
  },
});

export default ScoreCalcViewDescCell;
