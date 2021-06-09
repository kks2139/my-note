import React from 'react';

interface verticalNaviProps {
    children?: React.ReactNode
}

function VerticalNavi({children}: verticalNaviProps){

    return (
        <div className='vertical-navi'>
            
            <div className='vertical-navi-cont'>
                <div style={{height : '50px'}}></div>
                {children}
            </div>
        </div>
    );
}

export default VerticalNavi;