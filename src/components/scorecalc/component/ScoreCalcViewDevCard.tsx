import React from 'react';
import '@/i18n/i18n';
import Card from '@/utils/ui/Card.tsx';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import type {ThemeColor} from '@/utils/color/color.ts';
import ScoreCalcModule from '@/modules/ScoreCalcModule.ts';
import {ScoreCalcItemType} from '@/business/education/scorecalc/type.ts';
import CommonModule from '@/modules/CommonModule.ts';
import {useTranslation} from 'react-i18next';

const ScoreCalcViewDevCard = ({
  color,
}: {
  color: ThemeColor;
}): React.ReactElement => {
  const {t} = useTranslation();
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
      CommonModule.showToast('success', t('scorecalc.dev.verify_success'), '');
    } else {
      CommonModule.showToast(
        'error',
        t('scorecalc.dev.verify_failed'),
        t('scorecalc.dev.verify_failed_detail'),
      );
    }
  };

  return (
    <Card>
      <View>
        <Text style={{color: color.ham_text_primary}}>
          {t('scorecalc.dev.title')}
        </Text>
        <TextInput
          placeholder={t('scorecalc.dev.placeholder')}
          onChangeText={input => setCode(input)}
        />
        <TouchableOpacity onPress={() => verifyCode()}>
          <Text style={{color: color.ham_blue}}>{t('scorecalc.dev.done')}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ScoreCalcViewDevCard;
