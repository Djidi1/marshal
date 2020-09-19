import React, {Component} from 'react';
import {Page, Navbar, Block, Link} from 'framework7-react';

export default class RequestPage extends Component {
    render() {
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="red"
                    title="Заявка"
                    backLink="Back"
                />
                <Block strong>
                    <ul>
                        {Object.keys(this.$f7route.params).map(key => (
                            <li key={key}><b>{key}:</b> {this.$f7route.params[key]}</li>
                        ))}
                    </ul>
                </Block>
                <Block strong>
                    <Link onClick={() => this.$f7router.back()}>Назад</Link>
                </Block>
            </Page>
        );
    }
}