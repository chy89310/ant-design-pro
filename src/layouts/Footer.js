import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019{' '}
          <a href="https://www.mkmacau.com/" target="_blank" rel="noopener noreferrer">
            M & K Technology
          </a>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
