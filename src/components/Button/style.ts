import { Button } from "antd";
import styled from "styled-components";

export const Container = styled(Button)<{$color: string, width: string, textColor:string}>`
    background-color: ${props => props.$color};
    width: ${props => props.$width};
    color: ${props => props.$textColor || "#00000"};
    font-weight: 600;

`