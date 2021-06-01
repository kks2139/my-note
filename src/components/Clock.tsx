import React, {useEffect, useRef, useState} from 'react';
import {styleAttr} from '../util/interfaces';

interface clockProps {
    id?: string;
    style?: styleAttr;
    hidden?: boolean;
}

function Clock({id, style, hidden}: clockProps){
    const [clockValue, setClockValue] = useState({
        time : '',
        date : '',
        day : ''
    });
    let intervalId = useRef<NodeJS.Timeout | null>(null);
    const dayStr: string[] = ['월요일','화요일','수요일','목요일','금요일','토요일', '일요일'];

    const setTimeValues = (): void=>{
        const dt: Date = new Date();
        const d: string[] = dt.toLocaleDateString().split(' ');
        const t: string = dt.toLocaleTimeString();
        const day: string = dayStr[dt.getDay()];

        d.shift();
        d[0] = d[0].replace('.', '월');
        d[1] = d[1].replace('.', '일');
        const date: string = d.join(' ');

        setClockValue({
            time : t,
            date : date,
            day
        });
    }

    useEffect(()=>{
        intervalId.current = setInterval(()=>{
            setTimeValues();
        }, 1000);
        return ()=> clearInterval(intervalId.current!);
    }, []);

    return (
        <div className='clock-box' id={id} style={style} hidden={hidden}>
            {/* <div className='clock-sub-2'>
                <div>{clockValue.date}</div>
                <div>{clockValue.day}</div>
            </div> */}
            <div className='clock-sub-1'>{clockValue.time}</div>
        </div>
    );
}

export default Clock;