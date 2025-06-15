'use client';

import {Provider} from 'jotai';

type ProviderProps = {
  readonly children: React.ReactNode;
};

const AppProvider = ({children}: ProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default AppProvider;
