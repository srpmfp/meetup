import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {

    Scatter,
    ScatterChart,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';


const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(getData())
            console.log(data)
        }, 1000);
    },
        [`${events}`]);

    const getData = () => {
        // counts the number of events in each city
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(', ')[0];
            return { city, count };
        })
        return data;
    };

    return (


        <ResponsiveContainer width="99%" height={400}>

            <ScatterChart
                width={584}
                height={200}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis type="number" dataKey="count" name="Number of Events" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Number of Events" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>


    )
}

CityEventsChart.propTypes = {
    allLocations: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
};
export default CityEventsChart;