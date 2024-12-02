import { useState } from 'react';
import { Button } from '../Button'
import { Title } from '../Title'
import * as S from './style'
import { createNode, NodeInterface } from '../../utils/node';

export function Single(){
    const [head, setHead] = useState<NodeInterface | null>(createNode(1));

    const insertAtBeginning = (value: number) => {
        const newNode = createNode(value);
        newNode.next = head;
        setHead(newNode);
    };

    const insertAtEnd = (value: number) => {
        if (!head) return setHead(createNode(value));

        let current = head;
        while (current.next) {
            current = current.next;
        }
        current.next = createNode(value);
        setHead({ ...head });
    };
    

    const removeFromBeginning = () => {
        if (head) {
            setHead(head.next);
        }
    };

    const removeFromEnd = () => {
        if (!head) return;

        if (!head.next) {
            setHead(null);
            return;
        }

        let current = head;
        let previous = head;

        while (current.next) {
            previous = current;
            current = current.next;
        }

        previous.next = null;
        setHead({ ...head });
    };

    const renderNodes = (node: NodeInterface | null): JSX.Element[] => {
        const nodes: JSX.Element[] = [];

        let current = node;
        // const isSingleNode = !node?.next; 
        // const index = 0;
        while (current) {
            nodes.push(
                <S.nodes>
                    {/* {index === 0 && !isSingleNode && <p>head</p>}
                    {isSingleNode && <p>head/tail</p>}
                    {current.next === null && !isSingleNode && <p>tail</p>} */}
                    <S.node>
                        {current.value}
                    </S.node>
                    {current.next && <span>→</span>}
                </S.nodes>
            );
            current = current.next;
        }

        return nodes;
    };
    return(
        <S.Container>
            <Title title='Lista Encadeada Simples'/>
            <S.Content>
                <S.Left>
                    <p>Estrutura de dados linear em que os elementos, chamados de nós, são armazenados de forma não contínua na memória. Cada nó contém dois componentes principais: o dado armazenado e o ponteiro que aponta para o próximo nó da lista</p>
                    <ul>
                        <li>Dinâmica</li>
                        <li>Inserção e Remorsão eficientes</li>
                        <li>Acesso sequencial</li>
                        <li>Necessidade de percorrer a lista para acessar qualquer elemento</li>
                    </ul>
                    <div>
                        <h3>Exemplos de uso</h3>
                        <S.examplesDiv>
                            <S.Examples>
                                Lista de Compras
                            </S.Examples>
                            <S.Examples>
                                Fila de atendimento
                            </S.Examples>
                            <S.Examples>
                                Lista de afazeres
                            </S.Examples>
                        </S.examplesDiv>
                    </div>
                </S.Left>
                <S.Separator></S.Separator>
                <S.Right>
                    <S.ListArea>
                        {renderNodes(head)}
                    </S.ListArea>
                    <div className='btn'>
                        <Button text='Inserir no início' color='D5DDDF' onClick={() => insertAtBeginning(Math.floor(Math.random() * 100))}/>
                        <Button text='Inserir no fim' color='D5DDDF' onClick={() => insertAtEnd(Math.floor(Math.random() * 100))}/>
                    </div>
                    <div className='btn'>
                        <Button text='Remover no início' color='D5DDDF' onClick={removeFromBeginning}/>
                        <Button text='Remover no fim' color='D5DDDF' onClick={removeFromEnd}/>
                    </div>
                </S.Right>
            </S.Content>
        </S.Container>
    )
}