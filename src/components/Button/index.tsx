import React from "react"
import * as S from './style'

interface BtnInterface{
    color: string;
    textColor?: string;
    width?: string;
    text: string;
    onClick?: () => void;
    disable?: boolean
}

export const Button:React.FC<BtnInterface> = ({color, text, width, textColor, onClick, disable}) => {
    return(
        <S.Container onClick={onClick} $color={color} $width={width} textColor={textColor} disabled={disable}>
            {text}
        </S.Container>
    )

}