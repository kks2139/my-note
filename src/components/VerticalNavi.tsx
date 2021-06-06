import React from 'react';

interface verticalNaviProps {
    children?: React.ReactNode
}

function VerticalNavi({children}: verticalNaviProps){

    return (
        <div className='vertical-navi'>
            <div style={{height : '50px'}}></div>
            
            contents start

            <div className='vertical-navi-cont'>
                {children}
            </div>
        </div>
    );
}

export default VerticalNavi;