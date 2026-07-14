/// <reference types="vite/client" />

declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
interface Window {
  ym?: (
    counterId: number,
    methodName: string,
    target?: string | Record<string, unknown>,
    params?: Record<string, unknown>
  ) => void;
  smartCaptcha?: {
    render: (containerId: string, params: any) => number;
    execute: (widgetId?: number) => void;
    reset: (widgetId?: number) => void;
  };
}