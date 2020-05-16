import React from 'react';
import Response from "./components/response"
import {
  Page,
  Navbar,
  List,
  Icon,
  ListItem,
  Block,
  Subnavbar,
} from 'framework7-react';
import {connect} from "react-redux";

const ResponsesPage = (props) => {
  const { request, categories, f7 } = props;
  const get_category = (cat_id) => {
    const cat = categories ? categories.find(x => x.id === cat_id) : undefined;
    return cat !== undefined ? cat.category : "Без категории"
  }

  return (
    <Page>
      <Navbar
        color="white"
        textColor="white"
        bgColor="main"
        title="Предложения"
        backLink="Back"
      >
        <Subnavbar
          inner={false}
          className={"no-margin"}>
          <List
            mediaList
            className={"no-margin list-title"}
          >
            <ListItem
              swipeout
              after={request.created_at.toLocaleString()}
              subtitle={"Предложений: " + (request.answers.length || 0) + ""}
              text={request.text}
            >
              <span slot="title">
                  <Icon className={"status-icon"} material="access_time" color="blue"/>
                {get_category(request.category_id)}
              </span>
            </ListItem>
          </List>
        </Subnavbar>
      </Navbar>
      <List
        mediaList
        className={"no-margin list-with-header"}
      >
        <ul>
        {
          request.answers.length === 0
            ?
            <Block>На ваш запрос пока нет ответов...</Block>
            :
            request.answers.map(item =>
              <Response
                key={item.id}
                item={item}
                f7={f7}
              />
            )
        }
        </ul>
      </List>
    </Page>
  );
}

const mapStateToProps = ({ request, stores }) => {
  return {
    request: request[0],
    categories: stores.categories,
  }
};

export default connect(mapStateToProps, null)(ResponsesPage);
