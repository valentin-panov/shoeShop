import React, { ReactElement } from 'react';

export type Props = {
  className?: string;
  children: React.ReactNode | React.ReactChildren;
};

export default function Main({ className, children }: Props): ReactElement {
  return (
    <main className={`container ${className || ''}`}>
      <div className="row">
        <div className="col">{children}</div>
      </div>
    </main>
  );
}
