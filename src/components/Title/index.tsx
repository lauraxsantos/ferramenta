import React from 'react';
import * as S from './style'

interface TitleInterface{
    title: string;
}

export const Title: React.FC<TitleInterface> = ({title}) => {
    return (
        <S.Container>
            <p>{title}</p>
        </S.Container>
    )
}