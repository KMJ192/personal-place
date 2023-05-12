'use client';

import { useState } from 'react';

import HamburgerMenu from '@lib/ui/atom/HamburgerMenu/HamburgerMenu';

function Page() {
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <div>
      <HamburgerMenu type='type-4' active={active} onClick={onClick} />
    </div>
  );
}

export default Page;