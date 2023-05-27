import React from 'react';

import classNames from 'classnames/bind';
import style from './style.module.scss';
import DivideLine from './DivideLine';
const cx = classNames.bind(style);

function CareerDescription() {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>김명준 경력 기술서</div>
      <div className={cx('contents')}>
        <div className={cx('category')}>
          <div className={cx('sub-title')}>About Me</div>
          <DivideLine />
          <div className={cx('content', 'about-me')}>
            <div>Email : myeongjun222@gmail.com</div>
            <div>Phone : 010-2377-2467</div>
            <div>GitHub : https://github.com/KMJ192</div>
            <div>Blog : https://kmj24.tistory.com</div>
          </div>
        </div>
        <div className={cx('intro', 'category')}>
          <div className={cx('sub-title')}>Introduce</div>
          <DivideLine />
          <div className={cx('content', 'introduce')}>
            <div>공유를 좋아하는 개발자 김명준 입니다.</div>
            <div>
              팀 내에서 필요한 기술을 찾고 팀에 소개하고 공유하는 것을
              좋아합니다.
            </div>
            <div>
              팀 내에서 개발 환경 개선 및 개발 수준 향상에 기여하고 있습니다.
              이를 위해 프로젝트 설치 및 빌드 환경을 개선한 경험을 가지고
              있으며, 팀원의 개발 효율성을 높이기 위해 유용한 함수나 컴포넌트를
              개발하고 라이브러리로 배포한 경험이 있습니다.
            </div>
            <div>
              또한 프로젝트에서 새로운 기술 도입 및 문제 발생 시 해결에
              기여하고, 문제를 해결했던 경험을 공유하여 팀원의 역량을 향상
              시키는데 기여하고 있습니다.
            </div>
          </div>
        </div>
        <div className={cx('category')}>
          <div className={cx('sub-title')}>Career</div>
          <DivideLine />
          <div className={cx('content', 'career')}>
            <div>2021.07.19 ~ 재직 중</div>
            <div>
              AI 전문 인공지능 플랫폼 Jonathan을 운영하고 있는 “(주)아크릴”에서
              웹 FE 개발자로 근무
            </div>
            <div>2019.06.24 ~ 2021.02.28</div>
            <div>
              RPA 구축을 위한 에이전시 업체 “(주)파워젠”에서 RPA 개발자로 근무
            </div>
          </div>
        </div>
        <div className={cx('project', 'category')}>
          <div className={cx('sub-title')}>Project</div>
          <DivideLine />
          <div className={cx('content')}>내용</div>
        </div>
        <div className={cx('used', 'category')}>
          <div className={cx('sub-title')}>Used Skill & Tool</div>
          <DivideLine />
          <div className={cx('content')}>내용</div>
        </div>
      </div>
    </div>
  );
}

export default CareerDescription;
