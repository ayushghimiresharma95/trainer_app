import { useState, useEffect } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { setPath, setTrainer } from "../../State/State";
import fiLocale from 'date-fns/locale/fi';




import "./Calender.css";
import Navbar from "../Navbar";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
    "fi": fiLocale,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { 'fi': fiLocale },
});
const Calender = () => {
    const trainer = useSelector((state) => state.trainings);
    const defaultDate = new Date(2024, 5, 9, 0, 0, 0);
    const dispatch = useDispatch()

    const events = () => {
        const newEvents = trainer.map((event, index) => {
            

            
            const end = new Date(event.dateAndTime)
            end.setMinutes(end.getMinutes()+event.duration)
            return {
                id: index,
                title: `${event.activity}/${event.customer}`,
                start: new Date(event.dateAndTime),
                end: end
            };
        });
        setAllEvents(newEvents);
    };

    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        events();
        dispatch(setPath({path:"Calender"}))

    }, []);

    return (
        <div className="App">
            <Navbar />
            <Calendar
                defaultDate={defaultDate}
                defaultView={Views.WEEK}
                localizer={localizer}
                step={15}
                timeslots={8}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 1000, margin: "50px" }}
                
            />
        </div>
    );
};

export default Calender;
