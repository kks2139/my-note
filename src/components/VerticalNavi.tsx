import React, { useRef } from 'react';
import {FcPrevious} from 'react-icons/fc';

interface verticalNaviProps {
    children?: React.ReactNode
}

function VerticalNavi({children}: verticalNaviProps){
    const divRef = useRef<HTMLDivElement | null>(null);

    const onClickHide = (e: React.MouseEvent<HTMLDivElement>)=>{
        divRef.current!.classList.toggle('vertical-navi-hide');
        const btn = divRef.current!.querySelector('div[data-name=hide]');
        btn!.classList.toggle('turn-180');

        const contBox: HTMLTextAreaElement | null = document.querySelector('div.content-box');
        contBox!.classList.toggle('content-box-expand');
    }

    return (
        <div className='vertical-navi' ref={divRef}>
            
            <div className='vertical-navi-cont'>
                <div className='sessionbar-h'></div>
                {children}
            </div>
            <div className='vertical-navi-sub' onClick={onClickHide}>
                <div data-name='hide'>
                    <FcPrevious size='20'></FcPrevious>
                </div>
            </div>
        </div>
    );
}

export default VerticalNavi;