import React, { useEffect } from 'react';

interface historyPopupProp {
    showPopup: boolean;
    onCloseHistoryPopup: ()=>void;
}

function HistoryPopup({showPopup, onCloseHistoryPopup}: historyPopupProp){
    const testList = [
        {note_name : '할일', mod_kind : '내용수정', mod_dt : '2021.06.13'},
        {note_name : '할일', mod_kind : '내용수정', mod_dt : '2021.06.13'},
        {note_name : '면접질문', mod_kind : '내용수정', mod_dt : '2021.06.12'},
        {note_name : '할일', mod_kind : '내용수정', mod_dt : '2021.06.12'},
        {note_name : '면접질문', mod_kind : '노트추가', mod_dt : '2021.06.11'},
        {note_name : '할일', mod_kind : '노트추가', mod_dt : '2021.06.11'}
    ];

    useEffect(()=>{

    });

    return (
        <>
        {showPopup ?
            <div className='history-popup'>
                <div className='history-popup-title'>
                    <span>노트 수정 이력</span>
                    <div className='hover-effect' onClick={()=>{onCloseHistoryPopup()}}>X</div>
                </div>
                <div className='history-popup-list'>
                    <table>
                        <colgroup>
                            <col></col>
                            <col></col>
                            <col></col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>노트이름</th>
                                <th>수정내용</th>
                                <th>수정일시</th>
                            </tr>
                            {testList.map((d, i) =>{
                                return (
                                    <tr key={i}>
                                        <td>{d.note_name}</td>
                                        <td>{d.mod_kind}</td>
                                        <td>{d.mod_dt}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        : null}
        </>
    );
}

export default HistoryPopup;