import React from 'react';
import {connect} from "react-redux";
import {
  List,
  ListItem,
  Block,
  Card,
  AccordionContent, Icon,
} from 'framework7-react';
import Response from "./components/response";
import RequestListItem from "./components/requestItem";

const Legend = () => (
  <div className="legend row">
    <div className="col"><Icon className={"status-icon"} material="check_circle" color="green"/> - В наличии</div>
    <div className="col"><Icon className={"status-icon"} material="copyright" color="blue"/> - Оригинал</div>
    <div className="col"><Icon className={"status-icon"} material="event" color="orange"/> - Резерв</div>
  </div>
);


const RequestsPage = (props) => {
  const {
    requests,
    statuses,
    answers,
    f7,
  } = props;
  const colorsMap = ['orange', 'blue', 'pink', 'green', 'red']

  return (
    <>
      <Card
        content="Здесь находятся ваши заявки, заказы и уже сделанные покупки"
      />
      <List accordionList inset>
        <ListItem
          className={`list-item-request`}
          accordionItem
          title="Общие запросы"
          after={requests.filter(x => x.shop_id === null).length || '0'}
        >
          <AccordionContent>
            <List
              mediaList
              className="with-border"
            >
              <ul>
              {
                requests.filter(x => x.shop_id === null).length === 0
                  ? <Block>-</Block>
                  : requests.filter(x => x.shop_id === null).map(item => (
                    <RequestListItem
                      key={item.id}
                      item={item}
                      f7={f7}
                    />
                  ))
              }
              </ul>
            </List>
          </AccordionContent>
        </ListItem>
        <ListItem
          className={`list-item-request`}
          accordionItem
          title="Личный чат"
          after={answers.filter(x => x.reserve_date === null).length || '0'}
        >
          <AccordionContent>
            <List
              mediaList
              className="with-border"
            >
              <Legend />
              <ul>
              {answers.filter(x => x.reserve_date === null).map(item =>
                <Response
                  key={item.id}
                  item={item}
                  f7={f7}
                />
              )}
              </ul>
            </List>
          </AccordionContent>
        </ListItem>
        <ListItem
          className={`list-item-request`}
          accordionItem
          title="Резерв"
          after={answers.filter(x => x.reserve_date !== null).length || '0'}
        >
          <AccordionContent>
            <List
              mediaList
              className="with-border"
            >
              <Legend />
              <ul>
                {answers.filter(x => x.reserve_date !== null).map(item =>
                  <Response
                    key={item.id}
                    item={item}
                    f7={f7}
                  />
                )}
              </ul>
            </List>
          </AccordionContent>
        </ListItem>
        <ListItem
          className={`list-item-request`}
          accordionItem
          title="Мои заявки"
          after={requests.filter(x => x.shop_id === null).length || '0'}
        >
          <AccordionContent>
            <List accordionList inset>
              {statuses.map((status, index) => (
                <ListItem
                  className={`list-item-request bg-${colorsMap[index]}`}
                  key={`status_${status.id}`}
                  accordionItem
                  title={status.status}
                  after={requests.filter(x => x.status_id === status.id).length || '0'}
                >
                  <AccordionContent>
                    <List
                      mediaList
                      className="with-border"
                    >
                      <ul>
                        {
                          requests.filter(x => x.status_id === status.id).length === 0
                            ? <Block>-</Block>
                            : requests.filter(x => x.status_id === status.id).map(item => (
                              <RequestListItem
                                key={item.id}
                                item={item}
                                f7={f7}
                              />
                            ))
                        }
                      </ul>
                    </List>
                  </AccordionContent>
                </ListItem>
              ))}
            </List>
          </AccordionContent>
        </ListItem>
      </List>
    </>
  );
}


const mapStateToProps = ({requests, statuses, answers}) => {
  return {
    requests,
    statuses,
    answers,
  }
};

export default connect(mapStateToProps, null)(RequestsPage)