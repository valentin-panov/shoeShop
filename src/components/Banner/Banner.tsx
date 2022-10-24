import React, { ReactElement } from 'react';
import img from '../../img/banner.jpg';

export default function Banner(): ReactElement {
  return (
    <div className="banner">
      <img src={img} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
}
