import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

const EventGenreChart = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(getData());
            console.log(data);
        }, 1500);
    }, [`${events}`]);

    const getData = () => {
        // counts the number of events in each city
        const data = genres.map((genre) => {
            const count = events.filter((event) => event.summary.includes(genre));
            return {
                name: genre,
                value: count.length,
            };
        });
        return data;
    };
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
                verticalAnchor='start'

            >
                {data[index].value == 0 ? "" : `${data[index].name}`}
                {"  "}
                {data[index].value == 0 ? "" : `${(percent * 100).toFixed(0)}%`}

            </text >
        );
    };
    return (
        <ResponsiveContainer
            width='99%'
            height={400}
        >
            <PieChart
                width={400}
                height={400}>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    nameKey='name'
                    outerRadius={40}
                    fill='#8884d8'
                    dataKey='value'>
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend
                    verticalAlign='bottom'
                    height={100}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

EventGenreChart.propTypes = {
    events: PropTypes.array.isRequired,
};
export default EventGenreChart;
