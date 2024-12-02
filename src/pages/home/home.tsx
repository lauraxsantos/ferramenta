import { useNavigate } from "react-router-dom"
import * as S from "./styles"
export function Home () {
    const navigate = useNavigate()

    const learning = () => {
        navigate("/learning")
    }
    const editor = () => {
        navigate("/editor")
    }


    return(
        <S.Container>
            <S.Title>
                <h1>{`{Algoritmos e Estrutura de Dados}`}</h1>
            </S.Title>
                <S.ButtonsArea>
                    <S.Btn onClick={learning}>Learning</S.Btn>
                    <S.Btn onClick={editor}>Code Editor</S.Btn>
                </S.ButtonsArea>
        </S.Container>
    )
}