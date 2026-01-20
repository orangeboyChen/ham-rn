import React from 'react';
import Card from '@/utils/ui/Card.tsx';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import type {ThemeColor} from '@/utils/color/color.ts';
import ScoreCalcModule from '@/modules/ScoreCalcModule.ts';
import {ScoreCalcItemType} from '@/business/education/scorecalc/type.ts';
import CommonModule from '@/modules/CommonModule.ts';

const ScoreCalcViewDevCard = ({
  color,
}: {
  color: ThemeColor;
}): React.ReactElement => {
  const [code, setCode] = React.useState<string>('');

  const verifyCode = async () => {
    const res = await ScoreCalcModule.testItem({
      url: '',
      author: '',
      brief: '',
      date: '',
      desc: '',
      script: code,
      title: '',
      type: ScoreCalcItemType.APP,
      updateBrief: '',
      version: 0,
    });
    if (res) {
      CommonModule.showToast('success', '验证通过', '');
    } else {
      CommonModule.showToast(
        'error',
        '验证失败',
        '请检查代码中是否存在语法错误',
      );
    }
  };

  return (
    <Card>
      <View>
        <Text style={{color: color.ham_text_primary}}>开发调试</Text>
        <TextInput
          placeholder={'粘贴你的代码'}
          onChangeText={input => setCode(input)}
        />
        <TouchableOpacity onPress={() => verifyCode()}>
          <Text style={{color: color.ham_blue}}>完成</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ScoreCalcViewDevCard;
