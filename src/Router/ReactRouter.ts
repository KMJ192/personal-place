import Container, { ContainerProps } from './Container';
import Auth, { AuthProps } from './Auth';
import Common, { CommonProps } from './Common';
import Page, { PageProps } from './Page';
import NotFound, { NotFoundProps } from './NotFound';

const ReactRouter: {
  Container: (props: ContainerProps) => JSX.Element;
  Auth: (props: AuthProps) => JSX.Element;
  Page: (props: PageProps) => JSX.Element;
  Common: (props: CommonProps) => JSX.Element;
  NotFound: (props: NotFoundProps) => JSX.Element;
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
    },
  ]}>
    <ReactRouter.Auth auth='admin'>
      <ReactRouter.Page path='admin/url1'>
        <AdminPage1 />
      </ReactRouter.Page>
      <ReactRouter.Page path='admin/url2'>
        <AdminPage2 />
      </ReactRouter.Page>
      ...
    </ReactRouter.Auth>
    <ReactRouter.Auth auth='user'>
      <ReactRouter.Page path='user/url1'>
        <UserPage1 />
      </ReactRouter.Page>
      <ReactRouter.Page path='user/url2'>
        <UserPage2 />
      </ReactRouter.Page>
      ...
    </ReactRouter.Auth>
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
