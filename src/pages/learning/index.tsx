import { CaretDoubleLeft } from '@phosphor-icons/react'
import * as S from './style'
import { useState } from 'react'
import { Single } from '../../components/linkedList/single'
import { Doubly } from '../../components/linkedList/doubly'
import { Queue } from '../../components/queue'
import { Stack } from '../../components/stack'
import { BinarySearch } from '../../components/BinarySearch'
import { QuickSort } from '../../components/Sorting/quickSort'
import { MergeSort } from '../../components/Sorting/mergeSort'
import { BubbleSort } from '../../components/Sorting/bubbleSort'
import { useNavigate } from 'react-router-dom'
export function LearningPage(){

    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const pages = [1,2,3,4,5,6,7,8]

    const selectPage = (page: number) =>{
        setPage(page)
    }

    const home = () => {
        navigate("/")
    }

    return(
        <S.Container>
            <S.Header>
                <CaretDoubleLeft onClick={home} size={19} />
                <S.TextHome>Learning</S.TextHome>
            </S.Header>
            <S.PageArea>
                {pages.map((index) => 
                    <S.Page $color={page === index} onClick={() => selectPage(index)}>{index}</S.Page>      
                )}
            </S.PageArea>
            {page === 1  && (
                <Single/>
            )}
            {page === 2  && (
                <Doubly/>
            )}
            {page === 3  && (
                <Stack/>
            )}
            {page === 4  && (
                <Queue/>
            )}
            {page === 5  && (
                <BinarySearch/>
            )}
            {page === 6  && (
                <BubbleSort/>
            )}
            {page === 7  && (
                <MergeSort/>
            )}
            {page === 8  && (
                <QuickSort/>
            )}

        </S.Container>
    )
}