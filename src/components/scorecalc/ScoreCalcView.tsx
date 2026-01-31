import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  NativeEventEmitter,
  Platform,
} from 'react-native';
import ScrollView = Animated.ScrollView;
import {useColor} from '@/utils/color/color.ts';
import ScoreCalcViewCurrentCard from './component/ScoreCalcViewCurrentCard.tsx';
import ScoreCalcViewGoToGithubCard from './component/ScoreCalcViewGoToGithubCard.tsx';
import ScoreCalcViewOtherCard from './component/other/ScoreCalcViewOtherCard.tsx';
import type {ScoreCalcItem} from '@/business/education/scorecalc/type.ts';
import ScoreCalcModule from '@/modules/ScoreCalcModule.ts';
import ScoreCalcViewDevCard from './component/ScoreCalcViewDevCard.tsx';
import {
  fetchScoreCalcFromGithub,
  fetchScoreCalcFromLocal,
} from '@/business/education/scorecalc/fetch.ts';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

/**
 * @author orangeboyChen
 * @version 1.0
 * @date 2024/7/27 21:18
 */
const ScoreCalcView = (): React.ReactElement => {
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaProvider>
        <IOSInsetView>
          {({paddingTop}) => (
            <>
              <ScoreCalcViewContent paddingTop={paddingTop} />
            </>
          )}
        </IOSInsetView>
      </SafeAreaProvider>
    );
  } else {
    return <ScoreCalcViewContent paddingTop={0} />;
  }
};

const IOSInsetView = ({
  children,
}: {
  children: ({paddingTop}: {paddingTop: number}) => React.ReactNode;
}) => {
  const insets = useSafeAreaInsets();
  return children({paddingTop: insets.top});
};

const ScoreCalcViewContent = ({paddingTop}: {paddingTop: number}) => {
  const [currentItem, setCurrentItem] = useState<ScoreCalcItem>();
  const color = useColor();

  const [showDevMode, setShowDevMode] = useState(false);
  const [calcList, setCalcList] = useState<Array<ScoreCalcItem>>([]);

  useEffect(() => {
    updateScoreCalcFromLocal();
  }, []);
  useEffect(() => {
    updateCurrentItem();
  }, []);
  useEffect(() => {
    const eventBus = new NativeEventEmitter(ScoreCalcModule);
    const listener = eventBus.addListener('onSetScoreJsCalcItem', () => {
      updateCurrentItem();
    });
    return () => {
      listener.remove();
    };
  }, []);

  const updateCurrentItem = (): void => {
    ScoreCalcModule.getCurrentCalc().then(str => {
      try {
        const item = JSON.parse(str) as ScoreCalcItem;
        setCurrentItem(item);
      } catch {
        setCurrentItem(undefined);
      }
    });
  };

  const updateScoreCalcFromLocal = async () => {
    const localItem = fetchScoreCalcFromLocal();
    setCalcList(localItem);

    try {
      const githubItem = await fetchScoreCalcFromGithub();
      setCalcList([...localItem, ...githubItem]);
    } catch {}
  };
  return (
    <ScrollView
      style={{
        backgroundColor: color.ham_bg_b1,
        ...styles.container,
      }}>
      <View style={{paddingTop}} />
      <View style={styles.topPadding} />
      <ScoreCalcViewCurrentCard
        color={color}
        item={currentItem}
        listItem={calcList.find(
          o => o.title === currentItem?.title && o.url === currentItem.url,
        )}
        onSetItem={() => updateCurrentItem()}
      />
      <View style={styles.itemPadding} />
      <ScoreCalcViewGoToGithubCard
        color={color}
        showDevMode={() => setShowDevMode(true)}
      />
      {showDevMode && (
        <>
          <View style={styles.itemPadding} />
          <ScoreCalcViewDevCard color={color} />
        </>
      )}
      <View style={styles.itemPadding} />
      <ScoreCalcViewOtherCard
        color={color}
        currentItem={currentItem}
        onSetItem={() => updateCurrentItem()}
        calcList={calcList}
      />
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bottomPadding: {
    height: 96,
  },
  container: {
    paddingHorizontal: 16,
  },
  itemPadding: {
    height: 12,
  },
  topPadding: {
    height: 16,
  },
});

export default ScoreCalcView;
