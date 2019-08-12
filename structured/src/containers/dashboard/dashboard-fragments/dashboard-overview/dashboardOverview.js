import React from "react";
import Card from "../../../../components/interface/card/card";
import CardSimple from "../../../../components/interface/card-simple/cardSimple";
import ChartLine from "../../../../components/compound/chart-line/chartLine";
import ChartPie from "../../../../components/compound/chart-pie/chartPie";
import Table from "../../../../components/compound/table/table";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class DashboardOverview extends React.PureComponent {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <CardSimple
                        type="people"
                        title="Number of friends"
                        content={this.props.friendsCount}
                        details="Number of users you have made friends with"
                    />
                    <CardSimple
                        type="sessions"
                        title="Number of friend requests"
                        content={this.props.requestsCount}
                        details="Pending friend requests from others"
                    />
                    <CardSimple
                        type="timelapse"
                        title="Compete sessions"
                        content={this.props.competeCount}
                        details="Number of times you competed since registration"
                    />
                    <CardSimple
                        type="dashboard"
                        title="Learn graphs"
                        content="#"
                        details="Head home and choose start a learn mode"
                    />
                </div>
                <div className={classes.container}>
                    <Card title="Your latest compete statistics">
                        <ChartLine data={this.props.history} />
                    </Card>
                    <Card title="Algorithms by overall usage">
                        <ChartPie
                            data={[
                                {
                                    title: "Breadth-first search",
                                    percentage: 33
                                },
                                {
                                    title: "Depth-first search",
                                    percentage: 67
                                }
                            ]}
                        />
                    </Card>
                </div>
                <div className={classes.container}>
                    <Table
                        title="All your results in compete mode"
                        tableRows={5}
                        tableData={this.props.history}
                    />
                </div>
            </div>
        );
    }
}

DashboardOverview.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.arrayOf(PropTypes.object).isRequired,
    friendsCount: PropTypes.number.isRequired,
    requestsCount: PropTypes.number.isRequired,
    competeCount: PropTypes.number.isRequired
};

export default withStyles(styles)(DashboardOverview);
