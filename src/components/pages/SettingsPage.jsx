import React from 'react';
import {connect} from "react-redux";
import {set} from "idb-keyval";
import {
  List,
  ListItem,
  Icon,
  SwipeoutActions,
  SwipeoutButton
} from 'framework7-react';

class SettingsPage extends React.Component {

  logout() {
    set('user', undefined).then();
    set('AUTH_TOKEN', undefined).then(() => {
      // restart page
      document.location.reload();
      //this.$f7.views.main.router.navigate('/');
    });
  }
  //edit_user
  edit_user() {
    this.$f7.views.main.router.navigate('/edit_user/');
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        <h1>Личный кабинет</h1>
        {(user.initial === 0)
          ?
          <List
            mediaList
            className={"no-margin"}
          >
            <ListItem
              subtitle={user.email}
              swipeout
            >
              <span slot="title">
                  <Icon className={"status-icon"} material="account_circle" color="main"/> {user.name}
              </span>
              <SwipeoutActions right>
                <SwipeoutButton close color="orange" onClick={() => this.logout()}>
                  <Icon material="exit_to_app"/> Выйти
                </SwipeoutButton>
              </SwipeoutActions>
              <SwipeoutActions left>
                <SwipeoutButton close color="blue" onClick={() => this.edit_user()}>
                  <Icon material="edit"/> Редактировать
                </SwipeoutButton>
              </SwipeoutActions>
            </ListItem>
            <ListItem
              button
              link="/cars/"
              subtitle="Для быстрого поиска"
            >
              <span slot="title">
                <Icon className={"status-icon"} material="directions_car" color="main"/> Мои автомобили
              </span>
            </ListItem>
          </List>
          :

          <List
            mediaList
            className={"no-margin"}
          >
            <ListItem
              button
              link="login/"
              subtitle="После регистрации станут доступны дополнительные возможности"
            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="account_circle" color="main"/> Вход
                                </span>
            </ListItem>
          </List>
        }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
};

export default connect(mapStateToProps)(SettingsPage)