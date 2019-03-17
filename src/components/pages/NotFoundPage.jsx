import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Извините" backLink="Back" color={"red"} />
    <Block strong>
      <p>Как вы сюда попали?..</p>
      <p>Страница не найдена.</p>
    </Block>
  </Page>
);
