import React from 'react';
import {FiItalic, BiBold, MdFormatUnderlined, MdBorderColor} from 'react-icons/all';
import {ChromePicker} from 'react-color';
import {VscSymbolColor} from 'react-icons/vsc';
import { useState } from 'react';

function ToolBar(){

    const [info, setInfo] = useState({
        showColor : false,
        pickerColor : 'black'
    });

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        document.execCommand('fontSize', false, e.currentTarget.value + 'px');
    }
    const onClickColor = ()=>{
        setInfo({
            ...info,
            showColor : true
        });
    }
    const onClosePop = ()=>{
        setInfo({
            ...info,
            showColor : false
        });
    }

    const onClickTool = (e: React.MouseEvent<SVGElement> )=>{
        const {name} = e.currentTarget.dataset;
        switch(name){
            case 'italic':
            case 'bold':
            case 'underline':
                document.execCommand(name!);
                break;
            case 'hiliteColor':
                document.execCommand(name!, false, '#c0c000');
                break;
        }
    }

    const onPick = (color: {hex: string})=>{
        setInfo({
            ...info,
            pickerColor : color.hex
        });
        document.execCommand('forecolor', false, color.hex);
    }
    
    return (
        <div className='toolbar-box'>
            <div className='picker-box'>
                <VscSymbolColor size='20' color='black' onClick={onClickColor}></VscSymbolColor>
                {info.showColor ? 
                    <>
                        <div className='cover-for-hide' onClick={onClosePop}></div>
                        <ChromePicker className='color-picker' color={info.pickerColor} onChange={onPick} onChangeComplete={onPick}></ChromePicker>
                    </> 
                : null}
            </div>

            <select onChange={onChange} name='size'>
                <option value='1'>1pt</option>
                <option value='2'>2pt</option>
                <option value='3'>3pt</option>
                <option value='4'>4pt</option>
                <option value='5'>5pt</option>
                <option value='6'>6pt</option>
                <option value='7'>7pt</option>
            </select>

            <div className='edit-tools'>
                <FiItalic size='18' color='black' onClick={onClickTool} data-name='italic'></FiItalic>
                <BiBold size='20' color='black' onClick={onClickTool} data-name='bold'></BiBold>
                <MdFormatUnderlined size='20' color='black' onClick={onClickTool} data-name='underline'></MdFormatUnderlined>
                <MdBorderColor size='18' color='black' onClick={onClickTool} data-name='hiliteColor'></MdBorderColor>
            </div>
        </div>
    );
}

export default ToolBar;