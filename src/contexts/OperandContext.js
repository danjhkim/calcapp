import React, { useState, useEffect } from 'react';



export const OperandContext = React.createContext();

export const OpStore = (props) => {

    const [result, setResult] = useState('')
    const [firstNum, setFirstNum] = useState('')
    const [secondNum, setSecondNum] = useState('')
    const [opScreen, opScreenSet] = useState('')
    const [opScreen3, opScreenSet3] = useState('')
    const [op, setOp] = useState(null)
    const [tinyOp, setTinyOp] = useState('')
    const [timing, setTiming] = useState(false)
    const [clean, setClean] = useState(false)
    const [mathClean, setMathClean] = useState(false)
    const [opHolder, setOpHolder] = useState('')

    const operators = {
        "+": function (a, b) { return a + b },
        "-": function (a, b) { return a - b },
        "x": function (a, b) { return a * b },
        "÷": function (a, b) { return a / b },
        '=': function (a, b) { return b }
    };

    const doMath = () => {
        let parseNum1 = parseFloat(firstNum)
        let parseNum2 = parseFloat(secondNum)
        let ans = operators[op](parseNum1, parseNum2)
        let stringAns = ans.toString()
        if (stringAns.length >= 12) {
            let covertednum = ans.toPrecision(10)
            setResult(covertednum)
            if (mathClean) {
                setFirstNum(covertednum)
            }
        } else {
            setResult(stringAns)

        }
    }

    //set ths value as a state and then u can use the OP state inside the domath or use effect u can figure it out!
    const operand = (value) => {
        if (value === '=') {
            setTiming(true)
        }
        if (!firstNum) {
            if (value === "=") {
                return
            } else if (!firstNum && !op) {
                console.log('1')
                setFirstNum(result)
                opScreenSet(`${result}`)
                setOp(value)
                setTinyOp(value)
                setClean(true)
            } else if (!firstNum && op) {
                console.log('2')
                setFirstNum(result)
                opScreenSet(`${result}`)
                setOp(value)
                setTinyOp(value)
                setClean(true)
            }
        } else if (firstNum && result) {
            if (value === op) {
                if (!secondNum) {
                    console.log('2')
                    setSecondNum(result)
                    opScreenSet(`${opScreen}`)
                    opScreenSet3(`${result}`)
                    setTinyOp(value)
                    setTiming(true)
                } else if (secondNum && firstNum) {
                    return
                }
                setTinyOp(value)
            } else if (value === '=') {
                if (!secondNum) {
                    setSecondNum(result)
                    opScreenSet(`${firstNum}`)
                    opScreenSet3(`${result}`)
                    setTiming(true)
                    console.log('this part is fine1')
                } else if (secondNum && firstNum) {
                    if (value !== "=") {
                        setOp(value)
                        console.log('this part is fine2')
                    } else {
                        setFirstNum(result)
                        setTiming(true)
                        opScreenSet(`${result} ${op}`)
                        opScreenSet3(`${secondNum}`)
                        console.log('this part is fine3')
                    }
                }
            } else if (value !== op) {
                if (!secondNum) {
                    console.log('doink1')
                    setSecondNum(result)
                    opScreenSet(`${opScreen} ${tinyOp}`)
                    setTinyOp('')
                    opScreenSet3(`${result} ${value}`)
                    setOpHolder(value)
                    setMathClean(true)
                    setTiming(true)
                    setClean(true)
                } else if (secondNum && firstNum) {
                    console.log('doink2')
                    setSecondNum(result)
                    setOp(opHolder)
                    setOpHolder(value)
                    opScreenSet(`${result}`)
                    setTinyOp(value)
                    //work on this
                }
            }
        } else if (firstNum && !result) {
            setOp(value)
            opScreenSet(`${firstNum} ${value}`)
        }
    }

    useEffect(() => {
        if (timing) {
            doMath(op)
            setTiming(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timing])

    // if (firstNum && op && !secondNum) {
    //     console.log('booya')
    //     setOp(value)
    //     opScreenSet(`${firstNum} ${value}`)
    // }

    // const

    //     useEffect(() => {




    //         setClean(false)
    //     }, [clean])

    const keyvalue = (value) => {
        if (result.length >= 100) {
            return
        } else if (result.includes('.') && value === '.') {
            return
        } else if (value === '.' && result.length === 0) {
            setResult('0' + value)
        } else if (value === '-' && result) {
            if (result.includes('-')) {
                if (result.length === 1) {
                    setResult('')
                } else {
                    console.log('includng')
                    let realnumber = parseFloat(result)
                    setResult((realnumber * -1).toString())
                }
            } else {
                console.log('notincluding')
                setResult('-' + result)
            }
        } else if (result) {
            if (clean) {
                console.log('turd')
                setResult(value)
                setClean(false)
            } else {
                console.log('turd2')
                setResult(result + value)
            }
        } else {
            setResult(value)
            console.log('trifgfer')
        }
    }

    return (
        <OperandContext.Provider
            value={{ firstNum, setFirstNum, secondNum, setSecondNum, opScreen, opScreenSet, op, setOp, operand, doMath, timing, setTiming, keyvalue, setResult, result, setTinyOp, tinyOp, opScreenSet3, opScreen3 }}>
            {props.children}
        </OperandContext.Provider>
    );
}