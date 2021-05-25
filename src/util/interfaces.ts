/***  공통 type 선언  ***/

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
}
