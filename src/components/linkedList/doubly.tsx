import { useState } from 'react';
import { createDoublyNode, DoublyNode } from '../../utils/node';
import { Title } from '../Title'
import * as S from './style'
import { Button } from '../Button';

export const Doubly = () => {

    const [head, setHead] = useState<DoublyNode | null>(createDoublyNode(1));
    const [currentNode, setCurrentNode] = useState<DoublyNode | null>()

    const traverseForward = (node: DoublyNode | null) => {
        let current = node;
        const delay = 500;
        const traverseStep = () => {
            if (!current) return;

            setCurrentNode(current); 
            current = current.next;  

            if (current) {
                setTimeout(traverseStep, delay);
            }
        };

        traverseStep()
    };

    const traverseBackward = (node: DoublyNode | null) => {
        let current = node;
        const delay = 500; 
        while (current?.next) {
            current = current.next;
        }

        const traverseStep = () => {
            if (!current) return;

            setCurrentNode(current); 
            current = current.prev;  

            if (current) {
                setTimeout(traverseStep, delay);
            }
        };

        traverseStep();
    };

    
    const insertAtBeginning = (value: number) => {
        const newNode = createDoublyNode(value);
        if (head) {
            newNode.next = head;
            head.prev = newNode;
        }
        setHead(newNode);
    };

    const insertAtEnd = (value: number) => {
        if (!head) {
            return setHead(createDoublyNode(value));
        }

        let current = head;
        while (current.next) {
            current = current.next;
        }
        const newNode = createDoublyNode(value);
        current.next = newNode;
        newNode.prev = current;
        setHead({ ...head });
    };

    const removeAtBeginning = () => {
        if (!head) {
            return;
        }

        if (head.next) {
            const newHead = head.next;
            newHead.prev = null; 
            setHead(newHead);
        } else {
            setHead(null); 
        }
    };

    const removeAtEnd = () => {
        if (!head) {
            return;
        }

        if (!head.next) {
            setHead(null); 
            return;
        }

        let current = head;
        while (current.next) {
            current = current.next;
        }

        current.prev!.next = null; 
        setHead({ ...head }); 
    };

    // const searchValue = (value: number) => {
    //     let current = head;
    //     const delay = 500;

    //     const searchStep = () => {
    //         if (!current) {
    //             setCurrentNode(null)
    //             return;
    //         }

    //         setCurrentNode(current); 

    //         if (current.value === value) {
    //             setCurrentNode(current); 
    //             return;
    //         }
    //         current = current.next;
            
    //         if (current) {
    //             setTimeout(searchStep, delay); 
    //         } else {
    //             setCurrentNode(null); 
    //         }
    //     };

    //     searchStep();
    // };

    const renderNodes = (node: DoublyNode | null): JSX.Element[] => {
        const nodes: JSX.Element[] = [];
        let current = node;
        while (current) {
            nodes.push(
                <S.nodes>
                    <S.node $color={current === currentNode && '#FF6347'}>
                        {current.value}
                    </S.node>
                    {current.next && <span>⇔</span>}
                </S.nodes>
            )
            current = current.next;
        }


        return nodes;
    };

    return(
        <S.Container>
            <Title title='Lista Duplamente Encadeada'/>
            <S.Content>
                <S.Left>
                        <p>Variação das listas encadeadas, nas quais cada nó contém duas referências (ou ponteiros), uma que aponta para o próximo nó e outra que aponta para o nó anterior. Isso permite que você navegue tanto para frente quanto para trás pela lista.</p>                    
                        <ul>
                            <li>Navegação Bidirecional</li>
                            <li>Remoção facilitada</li>
                            <li>Flexibilidade na inserção</li>
                            <li>Maior uso de memória</li>
                        </ul>
                        <div>
                            <h3>Exemplos de uso</h3>
                            <S.examplesDiv>
                            <S.Examples>
                                Playlist de música
                            </S.Examples>
                            <S.Examples>
                                Navegação de abas
                            </S.Examples>
                            <S.Examples>
                                Carrosel de itens
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
                        <Button text='Remover no início' color='D5DDDF' onClick={removeAtBeginning}/>
                    </div>
                    <div className='btn'>
                        <Button text='Remover no fim' color='D5DDDF' onClick={removeAtEnd}/>
                        <Button text='Percorrer pelo início' color='D5DDDF' onClick={() => traverseForward(head)}/>
                        <Button text='Percorrer pelo final' color='D5DDDF' onClick={() => traverseBackward(head)}/>
                    </div>
                </S.Right>
            </S.Content>
        </S.Container>
    )
}