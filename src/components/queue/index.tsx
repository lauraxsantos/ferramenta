import { useState } from 'react';
import { Button } from '../Button'
import { Title } from '../Title'
import * as S from './style'


export const Queue = () => {
    const [queue, setQueue] = useState<number[]>([5,4,3]);

    const handleEnqueue = () => {
        setQueue((prevQueue) => [...prevQueue, Math.floor(Math.random() * 100)]);
    };

    const handleDequeue = () => {
        setQueue((prevQueue) => prevQueue.slice(1));
    };

    const content = (
        <div>
          <p>First In, First Out (Primeiro a entrar, Primeiro a sair)</p>
        </div>
      );

    return (
        <S.Container>
            <Title title='Filas'/>
            <S.Content>
                <S.Left>
                    <p>As filas são estruturas de dados amplamente usadas para organizar elementos em uma sequência onde o primeiro a entrar é o primeiro a sair <S.info content={content} placement='bottom'> (FIFO)</S.info>. Esse comportamento é ideal para situações em que precisamos garantir que os elementos sejam processados na ordem em que foram recebidos.</p>
                    <ul>
                        <li>Enqueue (Adiciona um elemento ao final da fila)</li>
                        <li>Dequeue (Remove o elemento no início da fila)</li>
                        <li>Aplicação Natural em Cenários de Espera</li>
                        <li>Acesso restrito</li>
                    </ul>
                    <div>
                        <h3>Exemplos de uso</h3>
                        <S.examplesDiv>
                            <S.Examples>
                                Filas de atendimento
                            </S.Examples>
                            <S.Examples>
                                Processamento de tarefas
                            </S.Examples>
                            <S.Examples>
                                Fila de mensagens
                            </S.Examples>
                        </S.examplesDiv>
                    </div>
                </S.Left>
                <S.Separator></S.Separator>
                <S.Right>
                    <div className='btn'>
                        <Button text='Enqueue' color='D5DDDF' onClick={handleEnqueue}/>
                        <Button text='Dequeue' color='D5DDDF' onClick={handleDequeue}/>
                    </div>
                    <S.QueueArea>
                        {queue.length != 0 ? queue.map((item, index) => 
                            <S.Queue $color="#628ECB" key={index}>{item}</S.Queue>
                        ) : <p>A Fila está vazia</p>}
                    </S.QueueArea>
                </S.Right>
            </S.Content>
        </S.Container>
    )
}