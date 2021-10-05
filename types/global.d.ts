declare module '*.css';
declare module '*.less';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module '*.png';
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare const ENV: 'prod' | 'local';
declare const PUBLIC_PATH: string;
declare const ROUTE_BASE: string;

type Nullable<T> = {[P in keyof T]: T[P]} | null
