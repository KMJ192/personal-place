import classNames from 'classnames/bind';
import style from './style.module.scss';
const cx = classNames.bind(style);

function DivideLine() {
  return <div className={cx('divide-line')}></div>;
}

export default DivideLine;
