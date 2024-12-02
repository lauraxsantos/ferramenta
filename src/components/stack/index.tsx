import { useState } from 'react';
import { Button } from '../Button'
import { Title } from '../Title'
import * as S from './style'

export const Stack = () => {
    const [stack, setStack] = useState<number[]>([1,6,7]);

    const handlePush = () => {
        setStack((prevStack) => [Math.floor(Math.random() * 100), ...prevStack]);
    };

    const handlePop = () => {
        setStack((prevStack) => prevStack.slice(1));
    };

    const content = (
        <div>
          <p>Last In, First Out (Último a entrar, Primeiro a sair)</p>
          <p>O primeiro elemento a ser inserido na pilha é o último a ser removido</p>
        </div>
      );

    return (
        <S.Container>
            <Title title='Pilhas'/>
            <S.Content>
                <S.Left>
                    <p>Estruturas de dados lineares que seguem o princípio de 
                    <S.info content={content} placement='bottom'> LIFO.</S.info> Em uma pilha, os elementos são inseridos e removidos apenas em uma extremidade, chamada de topo.</p>                    <ul>
                        <li>Acesso Restrito</li>
                        <li>Dinâmica</li>
                        <li>Simplicidade de Implementação</li>
                        <li>Ideais para tarefas recursivas</li>
                    </ul>
                    <div>
                        <h3>Exemplos</h3>
                        <S.examplesDiv>
                            <S.Examples>
                                Pratos empilhados
                            </S.Examples>
                            <S.Examples>
                                Pilha de chamadas
                            </S.Examples>
                        </S.examplesDiv>
                    </div>
                </S.Left>
                <S.Separator></S.Separator>
                <S.Right>
                    <div className='btn'>
                        <Button text='Push' color='D5DDDF' onClick={handlePush}/>
                        <Button text='Pop' color='D5DDDF' onClick={handlePop} disable={stack.length === 0}/>
                    </div>
                    <S.StackArea>
                        {stack.map((item, index) => 
                            <S.Stack $color="#628ECB" key={index}>{item}</S.Stack>
                        )}
                    </S.StackArea>
                </S.Right>
            </S.Content>
        </S.Container>
    )
}