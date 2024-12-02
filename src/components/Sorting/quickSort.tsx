/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Title } from '../Title'
import * as S from './style'
import { Button } from '../Button';

export const QuickSort = () => {
    const [array, setArray] = useState<number[]>([35, 23, 12, 89, 45, 16, 7, 56, 34]);
    const [, setSortedArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState<boolean>(false)
    const [currentPivotIndex, setCurrentPivotIndex] = useState<number | null>(null);
    const [currentIndices, setCurrentIndices] = useState<{ left: number | null; right: number | null }>({ left: null, right: null });          
    const [time, setTime] = useState<number>(1500);  
    const [speed, setSpeed] = useState<string>("0.5x");

    const quickSort = async (arr: number[]): Promise<number[]> => {
        const arrayCopy = [...arr];
        await quickSortHelper(arrayCopy, 0, arrayCopy.length - 1);
        setSortedArray(arrayCopy);
        setSorting(true)
        return arrayCopy;
    };

    const quickSortHelper = async (arr: number[], low: number, high: number): Promise<void> => {
        if (low < high) {
            const pivotIndex = await partition(arr, low, high);
            await quickSortHelper(arr, low, pivotIndex - 1);
            await quickSortHelper(arr, pivotIndex + 1, high);
        }
    };

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
        const pivot = arr[high];
        setCurrentPivotIndex(high); 
        let i = low - 1;

        for (let j = low; j < high; j++) {
            setCurrentIndices({ left: i + 1, right: j });
            await delay(time); 

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; 
                setArray([...arr]); 
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; 
        setArray([...arr]); 
        setCurrentPivotIndex(null); 
        setCurrentIndices({ left: null, right: null });

        await delay(time);
        return i + 1;
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSort = () => {
        quickSort(array);
    };
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

    const content = (
        <S.popInfo>
            <p>A técnica de divisão e conquista é uma abordagem utilizada para resolver problemas de forma eficiente, quebrando um problema maior em subproblemas menores e mais fáceis de resolver.</p>
        </S.popInfo>
    )
    return (
        <S.Container>
            <Title title='Quick Sort'/>
            <S.Content>
                <S.ListArea>
                    {array.map((item, index) => 
                        <S.Element $color={index === currentPivotIndex
                            ? '#ff6347'
                            : index === currentIndices.left || index === currentIndices.right
                            ? '#87ceeb' 
                            : '#f0f0f0'}key={index}>{item}</S.Element>
                    )}
                </S.ListArea>
                <div>
                    <Button text='Ordenar' color='#87ceeb' width='5rem' onClick={handleSort}></Button>
                    {sorting && (
                        <Button text='Misturar' color='#87ceeb' width='5rem' onClick={handleMix}></Button>
                    )}
                    <Button text={speed} color='#87ceeb' width='5rem' onClick={handleSpeed} disable={sorting}></Button>
                </div>
                <S.Info>
                    <S.Left>
                        <p>O QuickSort é um algoritmo de ordenação eficiente e amplamente utilizado, que utiliza a técnica de <S.info content={content} overlayStyle={{ width: 350}} placement='bottom'>divisão e conquista</S.info> para organizar elementos de um array. Ele possui uma complexidade média de O (n log n), tornando-o mais rápido do que outros algoritmos, como o Bubble Sort, especialmente para grandes conjuntos de dados.</p>                     
                        <h4>Pior Caso</h4>
                        <p>Acontece quando o pivô é sempre o maior ou menor elemento (partições de tamanho desequilibrado)</p>
                    </S.Left>
                    <S.Separator/>
                    <S.Right>
                        <h3>Funcionamento</h3>
                        <ol>
                            <li>Escolha de um pivô:</li>
                            <p>O algoritmo seleciona um elemento, chamado de "pivô", para ajudar a organizar o array. O pivô pode ser escolhido de várias maneiras (o primeiro, o último, o meio ou um elemento aleatório).</p> 
                            <li>Particionamento: O array é dividido em duas partes </li>
                            <p>
                                Menores ou iguais ao pivô: Todos os elementos menores ou iguais ao pivô vão para a esquerda.
                                Maiores que o pivô: Todos os elementos maiores que o pivô vão para a direita.
                            </p>
                            <li>Recursão</li>
                            <p>O QuickSort é chamado recursivamente para ordenar as sublistas à esquerda e à direita do pivô até que todas as divisões sejam concluídas, resultando em uma lista ordenada.
                            </p>
                        </ol>
                    </S.Right>
                </S.Info>
            </S.Content>
        </S.Container>
    )
}