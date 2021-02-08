import React, { useState, useEffect } from "react";
import { Text } from "react-native";

export default (props) => {
    const [time, setTime] = useState(props.time);

    useEffect(() => {
        let currentTime = time;
        let timer = setInterval(() => {
            console.log(currentTime);
            if (currentTime > 0) {
                setTime(--currentTime);
            }
            if (currentTime <= 0) {
                clearInterval(timer);
                if (props.completed !== undefined) {
                    props.completed();
                }
            }
        }, 1000); // in ms

        return () => clearInterval(timer);
    }, []);

    return (
        <Text>{time}</Text>
    );
}