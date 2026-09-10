import CookieManager from '@preeternal/react-native-cookie-manager';
import type {Cookie, Cookies} from '@preeternal/react-native-cookie-manager';
import {Linking} from 'react-native';

it('types', async () => {
  const c = CookieManager as unknown as {
    clearAll: ReturnType<typeof jest.fn>;
    getAll: ReturnType<typeof jest.fn>;
    get: ReturnType<typeof jest.fn>;
  };
  c.clearAll.mockResolvedValue(true);
  const cookies: Cookies = {
    a: {name: 'a', value: '1', domain: 'cas.whu.edu.cn'},
    b: {name: 'b', value: '2', domain: 'other.com'},
  } as Record<string, Cookie>;
  c.getAll.mockResolvedValue(cookies);
  await expect(c.clearAll(true)).resolves.toBe(true);
  const spy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
  await expect(Linking.openURL('https://x.com')).resolves.toBe(true);
  expect(spy).toHaveBeenCalledWith('https://x.com');
  const m: jest.Mock = jest.fn();
  m.mockReturnValue(3);
  expect(m()).toBe(3);
});
