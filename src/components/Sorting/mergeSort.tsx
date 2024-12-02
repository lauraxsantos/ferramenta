import { useState } from 'react';
import { Title } from '../Title'
import * as S from './style'
import { Button } from '../Button';
import mergeimg from './merge.png'
export const MergeSort = () => {
    const [array, setArray] = useState<number[]>([35, 23, 12, 89, 45, 16, 7, 56, 34]);
    const [mergeIndices, setMergeIndices] = useState<Set<number>>(new Set());     
    const [sorting, setSorting] = useState<boolean>(false)
    const [isModal, setModal] = useState<boolean>(false)          
    const [time, setTime] = useState<number>(1500);  
    const [speed, setSpeed] = useState<string>("0.5x");

    const mergeSort = async (arr: number[], startIdx = 0): Promise<number[]> => {
        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const left = await mergeSort(arr.slice(0, middle), startIdx);
        const right = await mergeSort(arr.slice(middle), startIdx + middle);

        const merged = await merge(left, right, startIdx);
        updateArrayVisual(merged, startIdx);
        await delay(time); 
        return merged;
    };

    const merge = async (left: number[], right: number[], startIdx: number): Promise<number[]> => {
        let result: number[] = [];
        let i = 0, j = 0;

        const indicesInMerge = new Set<number>();
        for (let k = 0; k < left.length; k++) indicesInMerge.add(startIdx + k);
        for (let k = 0; k < right.length; k++) indicesInMerge.add(startIdx + left.length + k);
        setMergeIndices(indicesInMerge);
       
        await delay(time);

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        result = result.concat(left.slice(i)).concat(right.slice(j));
        
        setMergeIndices(new Set()); 
        return result;
    };

    const updateArrayVisual = (mergedArray: number[], startIdx: number) => {
        setArray((prevArray) => {
            const newArray = [...prevArray];
            for (let i = 0; i < mergedArray.length; i++) {
                newArray[startIdx + i] = mergedArray[i];
            }
            return newArray;
        });
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSort = async () => {
        await mergeSort(array); 
        setSorting(true)
    };

    const content = (
        <S.popInfo>
            <p>A técnica de divisão e conquista é uma abordagem utilizada para resolver problemas de forma eficiente, quebrando um problema maior em subproblemas menores e mais fáceis de resolver.</p>
        </S.popInfo>
    )
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
            <Title title='Merge Sort'/>
            <S.Content>
                <S.ModalArea open={isModal} onCancel={() => setModal(false)}>
                    <img src={mergeimg}></img>
                </S.ModalArea>
                <S.ListArea>
                    {array.map((item, index) => 
                        <S.Element $color={mergeIndices.has(index) ? '#FFA500' : '#32cd32'} key={index}>{item}</S.Element>
                        
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
                        <p>
                        O Merge Sort é um algoritmo de ordenação eficiente e baseado no paradigma de <S.info content={content} overlayStyle={{ width: 350}} placement='bottom'>divisão e conquista</S.info>. Ele divide o array em partes menores, ordena essas partes e, em seguida, as mescla para formar o array ordenado final. Ele possui uma complexidade média de O(n log n), tornando-o mais rápido do que outros algoritmos para grandes conjuntos de dados</p>                     
                        <h4>Pior Caso</h4>
                        <p>O pior caso do Merge Sort é o mesmo que o caso médio e o melhor caso, pois o algoritmo sempre divide o array em metades e faz as comparações e mesclagens de maneira sistemática, independentemente da ordem dos elementos. O desempenho do algoritmo não é afetado pela disposição dos dados no arranjo de entrada.</p>
                    </S.Left>
                    <S.Separator/>
                    <S.Right>
                        <h3 onClick={() => setModal(true)}>Funcionamento</h3>
                        <ol>
                            <li>Divisão</li>
                            <p>Divide o array em duas metades de forma recursiva até que cada subarray contenha apenas um elemento (o que significa que ele está ordenado por definição).</p> 
                            <li>Mesclagem </li>
                            <p>Une os subarrays ordenados em um único array, comparando os elementos e mantendo a ordem.</p>
                            <li>Repetição</li>
                            <p>Esse processo de dividir e mesclar continua até que todo o array esteja ordenado.</p>
                        </ol>
                    </S.Right>
                </S.Info>
            </S.Content>
        </S.Container>
    )
}