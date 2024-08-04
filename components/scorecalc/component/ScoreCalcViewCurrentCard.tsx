/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/8/3 15:45
 */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ThemeColor} from '../../../common/color/color.ts';
import ScoreCalcViewDescCell from './ScoreCalcViewDescCell.tsx';
import {StyleSheet} from 'react-native';
import Card from '../../../common/ui/Card.tsx';
import {ScoreCalcItem} from '../../../business/education/scorecalc/type.ts';
import Color from 'color';
import ScoreCalcModule from '../../../modules/ScoreCalcModule.ts';
import CommonModule from '../../../modules/CommonModule.ts';
import {getJsScriptFromGithub} from '../../../business/education/scorecalc/fetch.ts';

interface ScoreCalcViewCurrentCardParams {
  color: ThemeColor;
  item: ScoreCalcItem | undefined;
  listItem: ScoreCalcItem | undefined;
  onSetItem: () => void;
}

const JSIcon = ({color}: {color: ThemeColor}) => {
  return (
    <View
      style={[
        {
          backgroundColor: Color(color.ham_gray).alpha(0.2).hexa(),
        },
        styles.iconContainer,
      ]}>
      <Image
        source={require('../../../resources/icon_js.png')}
        style={styles.icon}
      />
    </View>
  );
};

const ScoreCalcViewCurrentCard = ({
  color,
  item,
  listItem,
  onSetItem,
}: ScoreCalcViewCurrentCardParams): React.ReactElement => {
  const doUpdate = async () => {
    if (!listItem) {
      return;
    }
    if (listItem.script === '' && listItem.url) {
      try {
        listItem.script = await getJsScriptFromGithub(listItem.url);
      } catch (e: any) {
        CommonModule.showToast('error', '网络请求遇到了错误', '');
        return;
      }
    }
    const res = await ScoreCalcModule.selectCalc(listItem);
    if (!res) {
      CommonModule.showToast('error', '脚本未通过校验', '请联系脚本作者');
      return;
    }
    CommonModule.showToast('success', '已升级', '');
    onSetItem();
  };

  const canUpdate = listItem && listItem.version !== item?.version;
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
          正在使用
        </Text>
        {item ? (
          <View>
            <View style={styles.container}>
              <JSIcon color={color} />
              <ScoreCalcViewDescCell
                style={styles.descCell}
                item={item}
                listItem={listItem}
              />
              {canUpdate ? (
                <TouchableOpacity
                  style={styles.selectButtonContainer}
                  onPress={() => doUpdate()}>
                  <View
                    style={[
                      {
                        backgroundColor: Color(color.ham_gray)
                          .alpha(0.2)
                          .hexa(),
                      },
                      styles.selectButton,
                    ]}>
                    <Text
                      style={{
                        color: color.ham_blue,
                      }}>
                      升级
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.operationIcon}>
                  <Text style={styles.newestText}>最新</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View>
            <Text style={{color: color.ham_text_secondary}}>未选择</Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  descCell: {
    flexShrink: 1,
    flexGrow: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  operationIcon: {
    width: 40,
    marginTop: 12,
  },
  newestText: {
    textAlign: 'center',
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
  iconContainer: {
    borderRadius: 12,
    height: 48,
    width: 48,
  },
  icon: {
    height: 48,
    width: 48,
  },
});

export default ScoreCalcViewCurrentCard;
