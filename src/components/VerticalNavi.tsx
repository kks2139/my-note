import React, { useRef } from 'react';

interface verticalNaviProps {
    children?: React.ReactNode
}

function VerticalNavi({children}: verticalNaviProps){
    const divRef = useRef<HTMLDivElement | null>(null);

    const onClickHide = (e: React.MouseEvent<HTMLDivElement>)=>{
        divRef.current!.classList.toggle('vertical-navi-hide');
        const btn = divRef.current!.querySelector('div[data-name=hide]');
        btn!.classList.toggle('turn-180');
    }

    return (
        <div className='vertical-navi' ref={divRef}>
            
            <div className='vertical-navi-cont'>
                <div className='sessionbar-h'></div>
                {children}
            </div>
            <div className='vertical-navi-sub' onClick={onClickHide}>
                <div data-name='hide'>{'<'}</div>
            </div>
        </div>
    );
}

export default VerticalNavi;