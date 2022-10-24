import React, { ReactElement } from 'react';

export type Props = {
  className?: string;
  children: React.ReactNode | React.ReactChildren;
};

export default function Menu({ className, children }: Props): ReactElement {
  return <div className={className}>{children}</div>;
}
