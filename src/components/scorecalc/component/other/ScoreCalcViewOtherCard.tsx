/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 17:25
 */
import React from 'react';
import {Text, View} from 'react-native';
import Color from 'color';
import Card from '@/utils/ui/Card.tsx';
import type {ThemeColor} from '@/utils/color/color.ts';
import ScoreCalcViewOtherItemCell from './ScoreCalcViewOtherItemCell.tsx';
import {StyleSheet} from 'react-native';
import type {ScoreCalcItem} from '@/business/education/scorecalc/type.ts';
import ScoreCalcModule from '@/modules/ScoreCalcModule.ts';
import CommonModule from '@/modules/CommonModule.ts';
import {getJsScriptFromGithub} from '@/business/education/scorecalc/fetch.ts';
import Log from '@/modules/Log.ts';

interface ScoreCalcViewOtherCardParams {
  color: ThemeColor;
  calcList: Array<ScoreCalcItem>;
  currentItem: ScoreCalcItem | undefined;
  onSetItem: () => void;
}

const ScoreCalcViewOtherCard = ({
  color,
  calcList,
  currentItem,
  onSetItem,
}: ScoreCalcViewOtherCardParams): React.ReactElement => {
  return (
    <Card>
      <View>
        <Text
          style={[
            {
              color: color.ham_text_primary,
            },
            styles.title,
          ]}>
          选择其它计算方式
        </Text>
        {calcList.map((item, index) => (
          <View key={item.title + item.url + index}>
            <ScoreCalcViewOtherItemCell
              item={item}
              color={color}
              currentItem={currentItem}
              goToDetail={async () => {
                if (item.script === '' && item.url) {
                  try {
                    item.script = await getJsScriptFromGithub(item.url);
                  } catch {
                    CommonModule.showToast('error', '网络请求遇到了错误', '');
                    return;
                  }
                }
                ScoreCalcModule.openDetail(item);
              }}
              onSelect={async () => {
                if (item.script === '' && item.url) {
                  try {
                    item.script = await getJsScriptFromGithub(item.url);
                    Log.i(
                      'ScoreCalcViewOtherCard',
                      `onSelect - script=${item.script}`,
                    );
                  } catch {
                    CommonModule.showToast('error', '网络请求遇到了错误', '');
                    return;
                  }
                }
                const res = await ScoreCalcModule.selectCalc(item);
                if (!res) {
                  CommonModule.showToast(
                    'error',
                    '脚本未通过校验',
                    '请联系脚本作者',
                  );
                  return;
                }

                CommonModule.showToast('success', '已选择', '');
                onSetItem();
              }}
            />
            {calcList.length - 1 !== index && (
              <View
                style={[
                  {
                    backgroundColor: Color(color.ham_gray).alpha(0.2).hexa(),
                  },
                  styles.divider,
                ]}
              />
            )}
          </View>
        ))}
        {calcList.length === 0 && (
          <Text style={{color: color.ham_text_secondary}}>
            暂无更多，敬请期待
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 16,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
});

export default ScoreCalcViewOtherCard;
