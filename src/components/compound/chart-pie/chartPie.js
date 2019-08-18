import React from "react";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import PieChart from "recharts/es6/chart/PieChart";
import Pie from "recharts/es6/polar/Pie";
import Cell from "recharts/es6/component/Cell";
import Legend from "recharts/es6/component/Legend";
import PropTypes from "prop-types";

const statisticsColors = [
    "#bcaaa4",
    "#ffab91",
    "#ef9a9a",
    "#d5ee8a",
    "#f48fb1",
    "#ce93d8",
    "#90caf9",
    "#9fa8da",
    "#80deea",
    "#81d4fa",
    "#80cbc4"
];

const chartPie = props => (
    <ResponsiveContainer aspect={16.0 / 10.0}>
        <PieChart
            key={props.data.length}
            margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
        >
            <Pie
                data={props.data}
                labelLine={false}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="title"
            >
                {props.data.map((entry, index) => (
                    <Cell
                        name={entry.title}
                        key={`cell-${index}`}
                        fill={statisticsColors[index % statisticsColors.length]}
                    />
                ))}
            </Pie>
            <Legend verticalAlign="bottom" height={20} />
        </PieChart>
    </ResponsiveContainer>
);

chartPie.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default React.memo(chartPie);
