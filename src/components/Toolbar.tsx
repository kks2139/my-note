import React from 'react';
import {FiItalic, BiBold, MdFormatUnderlined, MdBorderColor} from 'react-icons/all';
import {DropDownList} from './CompLink';

function ToolBar(){
    const colorList = [
        ''
    ];
    
    return (
        <div className='toolbar-box'>
            <select>
                <option value='1'>빨강</option>
                <option value='2'>파랑</option>
                <option value='3'>검정</option>
            </select>
            <select>
                <option value='1'>10</option>
                <option value='1'>12</option>
                <option value='1'>14</option>
                <option value='2'>16</option>
                <option value='3'>18</option>
                <option value='3'>20</option>
                <option value='3'>22</option>
                <option value='3'>24</option>
                <option value='3'>26</option>
                <option value='3'>28</option>
                <option value='3'>30</option>
            </select>
            <div className='edit-tools'>
                <FiItalic size='18' color='black'></FiItalic>
                <BiBold size='20' color='black'></BiBold>
                <MdFormatUnderlined size='20' color='black'></MdFormatUnderlined>
                <MdBorderColor size='20' color='black'></MdBorderColor>
            </div>
        </div>
    );
}

export default ToolBar;