export type DeepKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? K extends string | number | boolean
      ? `${K}` | `${K}.${DeepKeys<T[K]>}`
      : never
    : K extends string | number | boolean
      ? `${K}`
      : never;
}[keyof T];

const getValueByDeepKey = <T>(obj: T, key: string): any => {
  return key.split('.').reduce((o, k) => (o ? (o as any)[k] : undefined), obj);
};

export default getValueByDeepKey;
