import React from "react";
import Grid from "@material-ui/core/Grid";
import RoomCard from "./room-card/roomCard";
import SomethingWentWrong from "../../../components/user-interface/something-went-wrong/somethingWentWrong";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const roomView = props => (
    <Grid className={props.classes.grid}>
        {props.rooms.length > 0 ? (
            props.rooms.map(room => {
                return (
                    <Grid
                        item
                        key={room["_id"]}
                        className={props.classes.gridItem}
                    >
                        <RoomCard
                            type={room.roomType}
                            name={room.name}
                            time={room.time}
                            currentUsers={room.currentUsers}
                            maxUsers={room.maxUsers}
                            enterRoom={props.enterRoom}
                        />
                    </Grid>
                );
            })
        ) : (
            <SomethingWentWrong text="Such empty, your friends didn't create any rooms." />
        )}
    </Grid>
);

export default withStyles(styles)(React.memo(roomView));
