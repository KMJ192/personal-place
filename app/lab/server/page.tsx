'use client';

import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

function Test({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Page() {
  // console.log(renderToString(Test()));
  console.log(
    renderToString(
      Test({
        children: (
          <div>
            <div>test</div>
          </div>
        ),
      }),
    ),
  );

  return <div></div>;
}

export default Page;
