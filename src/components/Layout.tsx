import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <div className="grid" style={{ placeContent: 'center', height: '100vh' }}>
        {children}
      </div>
    </div>
  );
};
