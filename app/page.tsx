'use client';

import { useRouter } from 'next/navigation';

import classNames from 'classnames/bind';
import style from './page.module.scss';
const cx = classNames.bind(style);

function Home() {
  const router = useRouter();

  return (
    <main className={cx('main')}>
      <button
        onClick={() => {
          router.push('/test');
        }}
      >
        test
      </button>
    </main>
  );
}

export default Home;
