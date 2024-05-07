import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Label } from 'recharts';
const _ = require("lodash");

const Barcharts = () => {
    const trainer = useSelector(state => state.trainings);
    const [filterTrainer, setFilterTrainer] = useState([]);

    const filterData = () => {
        const groupedData = _.groupBy(trainer, 'activity');
        const activityDurations = _.map(groupedData, (activities, activity) => {
            const totalDuration = _.sumBy(activities, 'duration');
            return { activity, totalDuration };
        });
        setFilterTrainer(activityDurations);
    };

    useEffect(() => {
        filterData();
    }, [trainer]); // Adding 'trainer' to dependency array to re-run filterData when 'trainer' changes

    return (
        <div style={{margin:"30px", display:"flex" ,justifyContent:"center",alignItems:"center"}}>
            {filterTrainer.length > 0 && // Check if filterTrainer is not empty before rendering
                <BarChart width={1300} height={700} data={filterTrainer}>
                    <XAxis dataKey="activity" stroke="#8884d8" > <Label value="Activity" position="insideBottom" offset={-5}  /></XAxis>
                    <YAxis dataKey="totalDuration" ><Label value="Total Duration (minutes)" angle={-90} position="insideLeft" offset={5} /></YAxis>
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="totalDuration" fill="#8884d8" barSize={30} />
                </BarChart>
            }
        </div>
    );
};

export default Barcharts;
