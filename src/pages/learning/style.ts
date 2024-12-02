import styled from "styled-components";

export const Container = styled.div`
`

export const Header = styled.div`
    display: flex;
    background-color: #395176;
    flex-direction: row;
    width: 100%;
    height: 40%;
    align-self: center;
    gap: 0.8rem;

    svg{
        color: white;
        align-self: center;
        padding-left: 1rem;
        cursor: pointer;
    }
`

export const TextHome = styled.p`
    color: #FFFFFF;
`

export const Page = styled.div<{$color: boolean}>`
    display: flex;
    background-color: ${props => props.$color ? "#7777DF" : "#BACBFE"};
    width: 3.5rem;
    height: 3.3rem;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
`

export const PageArea = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    justify-content: center;
`