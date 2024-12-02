/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useState, useEffect } from "react"
import * as S from "./style"
import { Editor } from "@monaco-editor/react"
import * as monaco from 'monaco-editor';
import { Element } from "../Element/Element"
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons"
import { CaretDoubleLeft } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

export const CodeEditor = () => {

    const navigate = useNavigate();

    type OpenItemsState = {
        [key: number]: boolean;
      };

    const [code, setCode] = useState<string>("function myArray(array){\n\t//escreva seu código aqui \n \treturn array\n}");
    const [arrayList, setArrayList] = useState<number[][]>([]);
    const [lastArr, setLastArr] = useState<number[]>([]);
    const [auxArray, setAuxArrayList] = useState<number[][]>([]);
    const [modifiedRanges, setModifiedRanges] = useState<{ startLine: number, endLine: number }[]>([]); // Para armazenar ranges modificados
    // const editorRef = useRef(null); 
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [decorationIds, setDecorationIds] = useState<string[]>([]);
    const [openItems, setOpenItems] = useState<OpenItemsState>({});
    const [isOpen, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    
    const toggleItem = (id:number) => {
      setOpenItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id], 
      }));
    };

    function monitorArrayChanges(arr: number[], callback: (statement: string, target: number[], property: number) => void) {
        return new Proxy(arr, {
            set(target, property, value, receiver) {
                if (typeof property === "string" && !isNaN(Number(property))) {
                    callback("set", value, Number(property));
                    auxArray.push([...target]);
                    
                    identifyArrayChanges();
                }
                return Reflect.set(target, property, value, receiver);
            },
            deleteProperty(target, property) {
                if (typeof property === "string" && !isNaN(Number(property))) {
                    // @ts-expect-error
                    callback("delete", target[property], Number(property));
                    auxArray.push([...target]);
                    
                    identifyArrayChanges();
                }
                return Reflect.deleteProperty(target, property);
            }
        });
    }

    const identifyArrayChanges = () => {
        const lines = code.split('\n');
        const arrayModificationLines = lines.reduce((acc: number[], line, index) => {
            if (line.includes('array') && line.includes('=')) {
                acc.push(index + 1); 
            }
            return acc;
        }, []);
        setModifiedRanges(arrayModificationLines.map(line => ({ startLine: line, endLine: line }))); 
    }

    function executeWithMonitoring(userCode: string | undefined, array: number[]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const monitoredArray = monitorArrayChanges(array, (_operation, _value, _index) => {
            const l = [...array];
            setArrayList([...auxArray, l]);
            setLastArr(array);
        });
        setArrayList([...auxArray, lastArr])
        setAuxArrayList([])
        try{
            if(userCode){
                const userFunction = new Function('array', userCode);
                return userFunction(monitoredArray);
            }

        } catch(e){
            setArrayList([])
            setLastArr([])
            setError("Syntax Error")
        }
    }

    const getCode = () => {
        try {
            return code.match(/{([\s\S]*)}/)![1].trim();
        } catch (error) {
            setError("Syntax Error")            
        }
    }

    const getArray = () => {
        const match = code.match(/myArray\(\[(.*?)\]\)/);
        if (match) {
            const numbersArray = match[1].split(',').map(Number);
            return numbersArray;
        } else return [5, 3, 8, 5, 0, 1];
    }
    
    const runCode = async () => {
        clearHighlights()        
        const arr = getArray();
        const userCode = getCode();
        executeWithMonitoring(userCode, arr);
    }

    useEffect(() => {
        if (editorRef.current) {
            const decorations = modifiedRanges.map(range => ({
                range: new monaco.Range(range.startLine, 1, range.endLine + 1, 1), 
                options: {
                    isWholeLine: false,
                    className: 'myHighlight', 
                }
            }));
            const newDecorationIds = editorRef.current.deltaDecorations(decorationIds, decorations);
            setDecorationIds(newDecorationIds);
        }
    }, [modifiedRanges]);

    useEffect(() => {
        setError(undefined)
        clearHighlights();
    }, [code]); 

    const handleChange = (value: string | undefined) => {
        if(value){
            setCode(value)
        }
    }
    const clearHighlights = () => {
        if (editorRef.current) {
            // @ts-ignore
            editorRef.current.deltaDecorations(decorationIds, []);
            setDecorationIds([]); 
        }
    }

    const content = (
        <span>
            <p>Manipulate the function parameter (array) to see the change down bellow</p>
        </span>
    )

    const home = () => {
        navigate("/")
    }
    
    return (
        <S.Container>
            <S.InfoArea>
                <S.backArea>
                    <CaretDoubleLeft onClick={home} size={19} />
                    <S.labelArea>
                        <label>Linguagem:</label>
                        <S.Language>Javascript</S.Language>
                    </S.labelArea>
                </S.backArea>
                <S.Info>
                    <S.InfoPop content={content}>
                        <InfoCircleOutlined style={{color: "white"}} />
                    </S.InfoPop>
                    <S.labelArea>
                        <label>Output:</label>
                        <S.RunBtn onClick={runCode}>Run code</S.RunBtn>
                    </S.labelArea>
                </S.Info>
            </S.InfoArea>
            <S.CodeArea>
                <Editor
                    height="100dvh"
                    width="60dvw"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) => handleChange(value)}
                    theme="vs-dark"
                    options={{ 
                        lineNumbers: "on",
                        automaticLayout: true,
                    }}
                    onMount={(editor) => { editorRef.current = editor; }} 
                />
                <S.runCode>
                    <S.Output>
                        {error ? <div style={{color: "red", paddingLeft: "1rem"}}>{error}</div> : <div/>}
                            {arrayList.map((item, i) => (
                                <div>
                                <S.ArrowDiv>
                                    <S.Arrow onClick={() => toggleItem(i)} isOpen={openItems[i]}><RightOutlined /> {openItems[i]}</S.Arrow>
                                    <p>Step {i+1}</p>
                                </S.ArrowDiv>
                                {openItems[i] && (
                                    <Element key={i} vector={item}></Element>
                                )}
                                </div>
                            ))}
                            {lastArr.length &&(
                                <S.ArrowDiv>
                                    <S.Arrow onClick={() => setOpen(!isOpen)} isOpen={isOpen}><RightOutlined /></S.Arrow>
                                    <p>Final Array</p>
                                </S.ArrowDiv>
                            )}
                        {isOpen && (
                            <Element vector={lastArr}></Element>
                        )}
                    </S.Output>
                </S.runCode>
            </S.CodeArea>
        </S.Container>
    );
}

// const style = document.createElement('style');
// style.textContent = `
//     .myHighlight {
//         background-color: #364f84; 
//     }
// `;
// document.head.append(style);
