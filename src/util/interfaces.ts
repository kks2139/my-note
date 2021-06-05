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
}

// 응답값
export interface resultAttr<dataType> {
    errMsg: string;
    data : dataType[];
}