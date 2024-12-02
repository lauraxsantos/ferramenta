import { Button, Popover, Select } from "antd";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: black;
    overflow: hidden;

    .myHighlight {
        background-color: #364f84; 
    }

`

export const CodeArea = styled.div`
    display: flex;
    flex-direction: row;
`

export const Output = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    padding-top: 1rem;
    height: 100dvh;
    overflow: scroll;
    `
export const runCode = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    width: 50%;
    height: 100dvh;
`

export const RunBtn = styled(Button)`
    background-color: transparent;
    color: white;
    width: 5rem;
    margin: 0;
`

export const InfoArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: black;
    gap: 45%;
    margin: 1rem;

`

export const backArea = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    svg{
        color: white;
        cursor: pointer;
    }
`

export const labelArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label{
        color: gray;
        font-size: 0.8rem;
    }

`

export const Language = styled.p`
    margin: 0;
    font-size: 1rem;
    border: solid 1px white;
    width: fit-content;
    color: white;
    padding: 0.1rem 0.5rem;
    border-radius: 0.3rem;
`

export const Structure = styled(Select)``

export const Element = styled.div`
    display: flex;
    width: 4dvw;
    align-items: center;
    justify-content: center;
    height: 7dvh;
    border: solid 1px black;
`

export const Vetor = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    background-color: red;
`

export const Arrow = styled.span<{isOpen:boolean}>`
  display: flex;
  margin-left: 1rem;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;
export const ArrowDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    color: gray;
`

export const Info = styled.span`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

export const InfoPop = styled(Popover)``