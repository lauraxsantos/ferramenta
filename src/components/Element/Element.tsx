import React from "react"
import * as S from "./style"

interface ElementIterface{
    vector: number[],
}

export const Element: React.FC<ElementIterface> = ({vector}) => {
    return (
        <S.Container>
            {vector.map((item, i) => {
                return(
                    <S.ElementArea key={i}>
                        <S.ElementContainer>{item}</S.ElementContainer>
                        <S.label>{i}</S.label>
                    </S.ElementArea>
                )
            })}
        </S.Container>
    )
    
    
}