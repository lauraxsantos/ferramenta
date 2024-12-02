import { useState } from 'react';
import { Title } from '../Title'
import * as S from './style'
import { Button } from '../Button';
export const BinarySearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [array] = useState<number[]>([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [target, setTarget] = useState<number | null>(null);
    const [time, setTime] = useState<number>(1500);
    const [speed, setSpeed] = useState<string>("0.5x");
    const [search, setSearching] = useState<boolean>(false);
    
    const binarySearch = (arr: number[], target: number) => {
        let left = 0;
        let right = arr.length - 1;
        
        const searchStep = () => {
            if (left <= right) {
                const mid = Math.floor((left + right) / 2);
                setCurrentIndex(mid);
                
                if (arr[mid] === target) {
                    setSearching(false)
                    return;
                } else if (arr[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
                
                
                setSearching(true)
                setTimeout(searchStep, time); 
                
            } else {
                setSearching(false)
                setCurrentIndex(null); 
            }
        };
        
        searchStep();
    };
    
    const handleSearch = () => {
        if (target || target === 0) {
            binarySearch(array, target);
        }
    };

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
            <Title title='Pesquisa Binária'/>
            <S.Content>
                <S.Top>
                    <S.ListArea>
                        {array.map((item, index) => 
                            <S.Element $color= {currentIndex === index && '#87ceeb'} key={index}>{item}</S.Element>
                        )}
                    </S.ListArea>
                    <div>
                        <S.InputTarget onChange={(e:string) => setTarget(Number(e))} placeholder="Busque um número"></S.InputTarget>
                        <Button text='Buscar' color='#87ceeb' width='5rem' onClick={handleSearch}></Button>
                        <Button text={speed} color='#87ceeb' width='5rem' onClick={handleSpeed} disable={search}></Button>
                    </div>
                </S.Top>
                <S.Bottom>
                    <S.Left>
                        <p>A pesquisa binária é um algoritmo eficiente para encontrar a posição de um elemento em uma lista ordenada. Sua principal característica é dividir o problema ao meio a cada iteração, reduzindo o número de elementos a serem considerados.</p>
                        <h4>Vantagens</h4>
                        <ul>
                            <li>Eficiência: Reduz o espaço de busca exponencialmente</li>
                            <li>Complexidade: O (log n), onde 𝑛 é o número de elementos na lista</li>
                        </ul>
                    </S.Left>
                    <S.Separator/>
                    <S.Right>
                        <h3>Funcionamento</h3>
                        <ol>
                            <li>Pré-requisito: A lista deve está ordenada</li>
                            <li>São definidos três ponteiros: Inicio, Meio e Fim da lista</li>
                            <ul>
                                <li>Se for igual, o elemento foi encontrado.</li>
                                <li>Se for menor, ajusta o fim para o meio - 1 (descarta a metade superior)..</li>
                                <li>Se for maior, ajusta o início para o meio + 1 (descarta a metade inferior)</li>
                            </ul>
                            <li>Compara o elemento informado com o valor da posição do meio</li>
                            <li>Repete o processo até encontrar o elemento ou até o início ser maior que o fim, indicando que o elemento não está na lista.</li>
                        </ol>
                    </S.Right>
                </S.Bottom>
            </S.Content>
        </S.Container>
    )
}