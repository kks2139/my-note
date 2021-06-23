/***  공통타입 선언  ***/

// 컴포넌트 inline 스타일 
export interface styleAttr {
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    margin?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marginBottom?: string;
    padding?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    position?: 'absolute' | 'relative' | undefined;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
    transition?: string;
    display?: string;
    opacity?: string;
    background?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
}

// 요청 파라미터
export interface requestParam {
    method?: string;
    url: string;
    body?: object;
    showLoad?: boolean;
}

// 응답값
export interface resultAttr<dataType> {
    errMsg: string;
    data : dataType[];
}

// 노트목록 조회 - 노트정보
export interface noteListAttr {
    user_id: string;
    note_id: string;
    note_name: string;
    txt_cont: string;
    ord: number;
    color: string;
    reg_dt: string;
    mod_dt: string;
}

// 컨텐츠박스 정보
export interface contentBoxAttr {
    nowContent: string;
    noteName: string;
    noteId: string;
}

// 노트이름 수정 파라미터
export interface editParam {
    noteName: string;
    noteId: string;
}