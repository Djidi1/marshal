import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    Block,
    BlockTitle,
    Button,
} from 'framework7-react';


export default class NewRequestPage extends Component {
    set_stores() {
        console.log('set_stores');
        const app = this.$f7;
        app.views.main.router.navigate('/stores_list/');
    }

    render() {
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="red"
                    title={this.$f7route.params.reqId > 0 ? "Редактировать заявку" : "Новая заявка"}
                    backLink="Back"
                >
                </Navbar>
                {/*
                даты формирования заявки,
                текста,
                марки и модели автомобиля,
                количества ответов магазинов
                */}
                    <BlockTitle>Здесь вы можете оставить заявку на подбор необходимой вам запчасти или услуги.</BlockTitle>
                    <List noHairlinesMd>
                        <ListInput
                            outline
                            label="Заголовок"
                            floatingLabel
                            type="text"
                            placeholder="Колодки, маслоб свечи"
                            clearButton
                        />
                        <ListInput
                            outline
                            label="Описание"
                            floatingLabel
                            type="textarea"
                            placeholder="Дополнительная информация о требуемом товаре..."
                            clearButton
                        />

                        <ListInput
                            outline
                            label="Запрос в магазин(ы)"
                            floatingLabel
                            type="text"
                            onFocus={() => this.set_stores()}
                            info="Выберите магазин из списка или отправьте запрос всем"
                            clearButton
                        />
                </List>
                <Block>
                    <Button
                        fill
                    >Отправить заявку</Button>
                </Block>
            </Page>
        );
    }
}