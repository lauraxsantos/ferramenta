import { Popover } from "antd";
import styled from "styled-components";

export const Container = styled.div``

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`
export const Left = styled.div`
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    width: 50%;

    p{
        font-size: 22px;
    }
    
    li{
        font-size: 18px;
    }
`
export const Right = styled.div`
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
`
export const Separator = styled.div`
    border: 1px solid gray;
`

export const Queue = styled.div<{$color: string}>`
    display: flex;
    background-color: ${props => props.$color};
    height: 6rem;
    width: 1.6rem;
    justify-content: center;
    align-items: center;
    border-radius: 1px;

`
export const QueueArea = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
`

export const Examples = styled.div`
    background-color: #628ECB;
    padding: 0.6rem;
    border-radius: 0.3rem;
    margin: 1rem;
`

export const examplesDiv = styled.div`
    display: flex;
    flex-direction: row;
`

export const info = styled(Popover)`
    color: #628ECB;
    border-bottom: 0.8px solid #628ECB;
`