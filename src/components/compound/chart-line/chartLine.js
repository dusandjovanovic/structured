import React from "react";
import PropTypes from "prop-types";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import AreaChart from "recharts/es6/chart/AreaChart";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Area from "recharts/es6/cartesian/Area";
import Tooltip from "recharts/es6/component/Tooltip";

const chartLine = props => (
    <ResponsiveContainer aspect={16.0 / 10.0}>
        <AreaChart
            data={props.data}
            key={props.data.length}
            margin={{ top: 20, right: 50, left: 5, bottom: 20 }}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#002a4a" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#002a4a" stopOpacity={0.2} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 25, right: 25 }} />
            <YAxis />
            <Tooltip />
            <Area
                type="monotone"
                dataKey="score"
                stroke="#9a9a9a"
                fill="url(#colorUv)"
            />
        </AreaChart>
    </ResponsiveContainer>
);

chartLine.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default React.memo(chartLine);
