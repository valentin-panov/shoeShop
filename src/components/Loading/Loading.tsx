import React, { ReactElement } from 'react';
import { TailSpin } from './TailSpin';

export default function Loading(): ReactElement {
  return (
    <div style={{ margin: '0.5vmin' }}>
      <TailSpin />
    </div>
  );
}
