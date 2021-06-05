import React from 'react';
import { RouteComponentProps } from 'react-router';
import {Button} from '../components/CompLink';

function NotFound({history}: RouteComponentProps){
    const btnStyle = {
        margin : '20px auto',
        width : '90px',
        fontSize : '20px'
    }
    return (
        <div className='not-found'>
            <div>
                <span>존재하지 않는 페이지입니다.</span>
            </div>
            <Button text='홈으로' style={btnStyle} onClick={()=> history.push('/')}></Button>
        </div>
    );
}

export default NotFound;