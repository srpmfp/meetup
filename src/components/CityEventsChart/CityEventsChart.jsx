import React, { useState, useEffect, PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    Scatter,
    ScatterChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(getData());
        }, 1500);
    }, [`${events}`]);

    const getData = () => {
        // counts the number of events in each city
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(', ')[0];

            return { count, city };
        });
        // const filteredData = data.filter((location) => location.count > 0);
        return data;
    };
    class CustomizedAxisTick extends PureComponent {

        render() {
            const { x, y, payload } = this.props;

            return (
                <g transform={`translate(${x},${y})`}>
                    <text
                        x={-10}
                        y={0}
                        dy={16}
                        textAnchor='end'
                        fontSize={10}
                        padding='no-gap'
                        fill='#ffffff'
                        transform='rotate(-35)'>
                        {payload.value}
                    </text>
                </g>
            );
        }
    }

    return (
        <ResponsiveContainer
            width='99%'
            height={300}>
            <ScatterChart

                margin={{
                    top: 20,
                    right: 10,
                    bottom: 20,
                }}>
                <CartesianGrid />
                <XAxis
                    type='category'
                    dataKey='city'
                    orientation='bottom'
                    padding='no-gap'
                    interval='PreserveStartEnd'
                    tick={<CustomizedAxisTick />}
                    name='City'
                />
                <YAxis
                    type='number'
                    dataKey='count'
                    name='Number of Events'
                    tick={<CustomizedAxisTick />}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter
                    name='Number of Events'
                    data={data}
                    fill='#ffffff'
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

CityEventsChart.propTypes = {
    allLocations: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
};
export default CityEventsChart;
