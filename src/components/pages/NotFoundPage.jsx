import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar
        title="Ошибка"
        backLink="Back"
        color="white"
        textColor="white"
        bgColor="main"
    />
    <Block strong>
      <p>Как вы сюда попали?..</p>
      <p>Страница не найдена.</p>
    </Block>
  </Page>
);
