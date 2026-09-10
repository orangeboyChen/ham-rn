import {Appearance, View} from 'react-native';
import {render, screen} from '@testing-library/react-native';

jest.mock('react-native-webview', () => {
  const react = require('react');
  const rn = require('react-native');
  return {
    WebView: react.forwardRef((props: Record<string, unknown>) =>
      react.createElement(rn.View, {testID: 'webview', ...props}),
    ),
  };
});

it('probe', async () => {
  process.stdout.write('scheme=' + String(Appearance.getColorScheme()) + '\n');
  await render(
    <View testID="v" source={{uri: 'x'}} injectedJavaScript={'js'} />,
  );
  const el = screen.getByTestId('v');
  process.stdout.write('props=' + JSON.stringify(Object.keys(el.props)) + '\n');
  process.stdout.write('uri=' + String(el.props.source.uri) + '\n');
  process.stdout.write('js=' + String(el.props.injectedJavaScript) + '\n');
});
