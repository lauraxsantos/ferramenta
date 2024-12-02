import { InputNumber } from "antd";
import styled from "styled-components";

export const Container = styled.div``

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    div{
        display: flex;
        justify-self: center;
        align-self: center;
        gap: 1rem;
    }

`
export const Element = styled.div<{$color:string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    border-radius: 25%;
    background-color: ${(props) => props.$color || '#6a5acd'};
    color: white;
`

export const ListArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`

export const InputTarget = styled(InputNumber)`
    width: 10rem;
    justify-self: center;
    align-self: center;

`

export const Bottom = styled.div`
    display: flex;
    flex-direction: row;

    h3{
        margin: 0;
        text-align: center;
        font-size: 25px;
        color: #395176;
        cursor: pointer;
    }

    h4{
        margin: 0;
        font-size: 23px;
    }

    ol{
        margin: 0;
    }
    ul{
        margin: 0;
    }

    li{
        color: #033597;
        font-size: 18px;
    }

    p{
        margin: 10px;
        font-size: large;
    }
`

export const info = styled.p`
    color: #628ECB;
    border-bottom: 0.8px solid #628ECB;
`

export const Top = styled.div`
    display: flex;
    flex-direction: column;
`
export const Left = styled.div`
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    width: 50%;

    li{
        color: black;
        font-size: 18px;
    }
`
export const Right = styled.div`
    border-left: 1px solid gray;
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    overflow: auto;
    gap: 1rem;

    div{
        display: flex;
        gap: 0.3rem;
    }

    li{
        padding-bottom: 0.3rem;
    }
`
export const Separator = styled.div`
    border: 1px solid gray;
`