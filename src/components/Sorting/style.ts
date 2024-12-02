import { Modal, Popover } from "antd";
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
export const Info = styled.div`
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
    li{
        color: #033597;
        font-size: 18px;
        /* text-decoration: underline solid #395176; */
    }

    p{
        margin: 10px;
        font-size: large;
    }
`

export const Separator = styled.div`
    border: 1px solid gray;
    background-color: red;
`

export const Left = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 2rem;
`
export const Right = styled.div`
    border-left: 1px solid gray;
    display: flex;
    flex-direction: column;
    width: 50%;

`

export const info = styled(Popover)`
    color: #628ECB;
    border-bottom: 0.8px solid #628ECB;
`
export const popInfo = styled.div`
    /* background-color: red; */
`

export const ModalArea = styled(Modal)`
    display: flex;
    img{
        width: 100%;
    }
`
