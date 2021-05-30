import React from 'react';
import {Button} from './CompLink';

type rootEl = 'button' | 'combo';

interface comboListProps {
    type : rootEl;
    text : string;
    items : string[];
}

function ComboList({type, text, items}: comboListProps){
    return (
        <div>
            <Button text={text}></Button>
            <div>
                {/* rootEl 클릭시 리스트 보여줌 */}
            </div>
        </div>
    );
}

export default ComboList;