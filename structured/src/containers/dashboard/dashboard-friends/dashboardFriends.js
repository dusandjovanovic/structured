import React from 'react';
import { ListGroupItem, ListGroup } from "reactstrap";

const dashboardFriends = (props) => (
    <ListGroup flush className="Listview">
        {
            props.friends.map((friend => (
                <ListGroupItem className="list-group-item-action flex-column align-items-start p-4" key={friend}>
                    <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">{friend}</h4>
                        <small className="Highlighted"> a few days ago</small>
                    </div>
                    <p className="mb-1 pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et malesuada libero. Quisque ante dolor, pharetra sed pulvinar sed, gravida feugiat velit. Mauris eget mi ex.</p>
                </ListGroupItem>
            )))
        }
    </ListGroup>
);

export default dashboardFriends;