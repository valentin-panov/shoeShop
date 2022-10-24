import React, { ReactElement } from 'react';
import './Skeleton.css';

export type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: Props): ReactElement {
  return <div {...props} className="skeleton" />;
}
