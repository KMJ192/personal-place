import Container from './Container';
import Auth from './Auth';
import Common from './Common';
import Page from './Page';
import NotFound from './NotFound';

import type { ContainerType } from './types';

const ReactRouter: {
  Container: (props: ContainerType) => null;
  Auth: () => Array<JSX.Element>;
  Common: () => JSX.Element;
  Page: () => JSX.Element;
  NotFound: () => JSX.Element;
} = {
  Container,
  Auth,
  Common,
  Page,
  NotFound,
};

export default ReactRouter;
/*
  <ReactRouter.Container permission={[
    {
      auth: 'admin',
    },
    {
      auth: 'user'
    }
  ]}>
    <ReactRouter.Auth[0]>
      <ReactRouter.Page path='admin/url1'>
        <AdminPage1 />
      </ReactRouter.Page>
      <ReactRouter.Page path='admin/url2'>
        <AdminPage2 />
      </ReactRouter.Page>
      ...
    </ReactRouter.Auth[0]>
    <ReactRouter.Auth[1]>
      <ReactRouter.Page path='user/url1'>
        <UserPage1 />
      </ReactRouter.Page>
      <ReactRouter.Page path='user/url2'>
        <UserPage2 />
      </ReactRouter.Page>
      ...
    </ReactRouter.Auth[1]>
    <ReactRouter.Common>
      <ReactRouter.Page path='common/url1'>
        <CommonPage1 />
      </ReactRouter.Page>
      <ReactRouter.Page path='common/url2'>
        <CommonPage2 />
      </ReactRouter.Page>
    </ReactRouter.Common>
    <ReactRouter.NotFound>
      <NotFound />
    </ReactRouter.NotFound>
  </ReactRouter.Container>
*/
