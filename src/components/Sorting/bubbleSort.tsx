import { useState } from 'react';
import { Title } from '../Title'
import * as S from './style'
import { Button } from '../Button';

export const BubbleSort = () => {
    const [array, setArray] = useState<number[]>([35, 23, 12, 89, 45, 16, 7, 56, 34]);
    const [compareIndices, setCompareIndices] = useState<[number, number] | null>(null); 
    
    const [sorting, setSorting] = useState<boolean>(false)
    const [sortedIndex, setSortedIndex] = useState<number | null>(null);       
    const [time, setTime] = useState<number>(1500);  
    const [speed, setSpeed] = useState<string>("0.5x");

    const bubbleSort = async () => {
        const arr = [...array];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                setCompareIndices([j, j + 1]); 
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; 
                    setArray([...arr]); 
                    await delay(time); 
                }
            }
            setSortedIndex(arr.length - i - 1); 
            await delay(time);
        }
        setCompareIndices(null); 
        setSortedIndex(null); 
        setSorting(true)
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleMix = () => {
        setArray([35, 23, 12, 89, 45, 16, 7, 56, 34])
        setSorting(false)
    }

    const handleSpeed = () => {
        if(speed == "0.5x"){
            setTime(1000)
            setSpeed("1x")
        }else if(speed == "1x"){
            setTime(500)
            setSpeed("2x")
        } else{
            setTime(1500)
            setSpeed("0.5x")
        }
    }

    return (
        <S.Container>
            <Title title='Bubble Sort'/>
            <S.Content>
                <S.ListArea>
                    {array.map((item, index) => 
                        <S.Element $color={compareIndices && (index === compareIndices[0] || index === compareIndices[1])
                            ? '#FFA500' // Laranja para elementos em comparação
                            : index > sortedIndex!
                            ? '#32cd32' // Verde para elementos ordenados
                            : '#87ceeb'} key={index}>{item}</S.Element>
                    )}
                </S.ListArea>
                <div>
                    <Button text='Ordenar' color='#87ceeb' width='5rem' onClick={bubbleSort}></Button>
                    {sorting && (
                        <Button text='Misturar' color='#87ceeb' width='5rem' onClick={handleMix}></Button>                        
                    )}
                    <Button text={speed} color='#87ceeb' width='5rem' onClick={handleSpeed} disable={sorting}></Button>
                </div>
                <S.Info>
                    <S.Left>
                        <p>O Bubble Sort é um algoritmo de ordenação simples que organiza uma lista de elementos, geralmente números, comparando pares consecutivos e trocando-os se estiverem na ordem errada. Apesar da simplicidade, o Bubble Sort não é eficiente para lidar com grandes conjuntos de dados, especialmente no pior caso, pois a complexidade de tempo do Bubble Sort no pior caso é 𝑂(n²) o que torna o desempenho muito lento em comparação com algoritmos mais avançados, como Quick Sort (𝑂(𝑛 log 𝑛)) ou Merge Sort (𝑂(𝑛 log 𝑛)).</p>                     
                        <h4>Pior Caso</h4>
                        <p>O pior caso do Bubble Sort ocorre quando o array está em ordem inversa, ou seja, completamente desordenado no sentido contrário ao desejado. Isso porque, nesse cenário, o algoritmo precisa fazer o número máximo de comparações e trocas possíveis.</p>
                    </S.Left>
                    <S.Separator/>
                    <S.Right>
                        <h3>Funcionamento</h3>
                        <ol>
                            <li>Comparação</li>
                            <p>O algoritmo percorre o array do início ao final, comparando cada par de elementos consecutivos.</p> 
                            <li>Troca</li>
                            <p>Se o primeiro elemento do par é maior que o segundo, eles são trocados. Caso contrário, continuam na mesma posição.
                            </p>
                            <li>Repetição</li>
                            <p>O processo de comparação e troca é repetido, percorrendo o array várias vezes até que nenhuma troca seja necessária, o que indica que o array está ordenado.
                            </p>
                        </ol>
                    </S.Right>
                </S.Info>
            </S.Content>
        </S.Container>
    )
}