// AntdProvider.tsx
import React from 'react';
import { App } from 'antd';

export const AntdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <App
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </App>
  );
};

export default AntdProvider;