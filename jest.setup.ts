/**
 * Global Jest setup.
 *
 * Everything here is a default that individual tests can override with
 * `jest.mock(...)` or by calling the exported helpers.
 */
import '@testing-library/react-native/matchers';

// `react-native-safe-area-context` renders `RNCSafeAreaProvider` with no
// children under Jest (it waits for native layout measurements that never
// arrive), which makes the whole subtree unassertable. Render children
// directly instead.
jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    SafeAreaProvider: ({children}: {children: unknown}) => children,
    SafeAreaConsumer: ({children}: {children: (inset: unknown) => unknown}) =>
      children({top: 0, bottom: 0, left: 0, right: 0}),
    useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
  };
});

// TurboModules are backed by native code that does not exist in Jest, and the
// specs call `getEnforcing`, which throws on a missing module. Default every
// spec to a jest.fn()-backed stub; tests override per-case.
jest.mock('@/modules/NativeLog', () => ({
  __esModule: true,
  default: {i: jest.fn(), e: jest.fn()},
}));

jest.mock('@/modules/NativeCommonModule', () => {
  const onLocaleChanged = jest.fn(() => ({remove: jest.fn()}));
  return {
    __esModule: true,
    default: {
      openUrl: jest.fn(),
      showToast: jest.fn(),
      getLocale: jest.fn(() => 'zh'),
      onLocaleChanged,
    },
  };
});

jest.mock('@/modules/NativeCasModule', () => ({
  __esModule: true,
  default: {requestCasCookie: jest.fn(() => '')},
}));

jest.mock('@/modules/NativeCasMobileLoginModule', () => ({
  __esModule: true,
  default: {onRequestSuccess: jest.fn()},
}));

jest.mock('@/modules/NativeEducationModule', () => ({
  __esModule: true,
  default: {
    onGetCourseList: jest.fn(),
    onGetScoreList: jest.fn(),
    getCourseConfig: jest.fn(() => ({year: 0, semester: 0})),
  },
}));

jest.mock('@/modules/NativeScoreCalcModule', () => {
  const onSetScoreJsCalcItem = jest.fn(() => ({remove: jest.fn()}));
  return {
    __esModule: true,
    default: {
      getCurrentCalc: jest.fn(() => ''),
      selectCalc: jest.fn(() => true),
      openDetail: jest.fn(),
      testItem: jest.fn(() => true),
      onSetScoreJsCalcItem,
    },
  };
});
