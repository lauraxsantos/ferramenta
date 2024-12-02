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

    .btn{
        width: 100%;
        display: flex;
        gap: 2rem;
        margin-bottom: 1rem;
        justify-content: center;
    }

`
export const Separator = styled.div`
    border: 1px solid gray;
`

export const nodes = styled.div`
    margin-left: 0.2rem;
    display: flex;
    align-items: center; 
    margin-bottom: 2rem;
`


export const node = styled.div<{$color?:string}>`
    margin-right: 0.2rem;
    padding: 0.9rem;
    border-radius: 50%;
    background-color: ${(props) => props.$color || '#6a5acd'};
    color: white;
`
    
export const ListArea = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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