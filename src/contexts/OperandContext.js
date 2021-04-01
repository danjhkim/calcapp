import React, { useState, useEffect } from 'react';



export const OperandContext = React.createContext();

export const OpStore = (props) => {
    var operators = {
        "+": function (a, b) { return a + b },
        "-": function (a, b) { return a - b },
        "x": function (a, b) { return a * b },
        "÷": function (a, b) { return a / b },
        '=': function (a, b) { return b }
    };

    const [result, setResult] = useState("")
    const [firstNum, setFirstNum] = useState("")
    const [secondNum, setSecondNum] = useState("")
    const [opScreen, opScreenSet] = useState("")
    const [op, setOp] = useState("")
    const [backUpOp, setBackUpOp] = useState("")
    const [timing, setTiming] = useState(false)
    const [answer, setAnswer] = useState("")
    const [timing2, setTiming2] = useState(false)

    const operand = (value) => {
        if (value === "=") {
            if (firstNum && secondNum) {
                console.log('1')
                setBackUpOp(value)
                setAnswer(result)
                setTiming2(true)
            } else if (firstNum && !secondNum) {
                if (result) {
                    console.log('2')
                    setBackUpOp(value)
                    setSecondNum(result)
                    setTiming2(true)
                } else {
                    if (answer) {
                        console.log('3')
                        opScreenSet(`${answer}`)
                        setOp("")
                        setResult('')
                    } else {
                        console.log('4')
                        setOp("")
                    }
                }
            } else {
                console.log('4')
                // setAnswer(result)
                setBackUpOp(value)
                setTiming2(true)
            }
        } else {
            if (!firstNum) {
                console.log('5')
                setFirstNum(result)
                setOp(value)
                setBackUpOp(value)
                if (answer) {
                    console.log('6')
                    opScreenSet(`${answer} ${value}`)
                    setResult('')
                } else {
                    console.log('7')
                    opScreenSet(`${result} ${value}`)
                    setResult('')
                }
            } else if (firstNum && !secondNum && !result) {
                console.log('8')
                setOp(value)
                if (answer) {
                    console.log('9')
                    opScreenSet(`${answer} ${value}`)
                } else {
                    console.log('10')
                    opScreenSet(`${firstNum} ${value}`)
                }
            } else if (firstNum && !secondNum && result) {
                console.log('11')
                setSecondNum(result)
                setBackUpOp(value)
                opScreenSet(`${opScreen} ${result} ${value}`)
                setTiming(true)
            }
        }
    }

    const doMath = () => {
        if (!firstNum && !secondNum) {
            setAnswer(result)
            opScreenSet(result)
        } else {
            try {
                let parseNum1 = parseFloat(firstNum)
                let parseNum2 = parseFloat(secondNum)
                let ans = operators[op](parseNum1, parseNum2)
                let stringAns = ans.toString()
                setAnswer(stringAns)
                setFirstNum("")
                setSecondNum("")
                setOp(backUpOp)
            }
            catch (err) {
                setAnswer(result)
            }
        }
    }

    const doMathEqual = () => {
        if (!op) {
            console.log('doink')
            opScreenSet(result)
            setAnswer(result)
        } else if (!secondNum) {
            console.log('doink2')
            opScreenSet(answer)
            setAnswer(answer)
        } else {
            try {
                console.log('doink3')
                let parseNum1 = parseFloat(firstNum)
                let parseNum2 = parseFloat(secondNum)
                let ans = operators[op](parseNum1, parseNum2)
                let stringAns = ans.toString()
                opScreenSet(stringAns)
                setAnswer(stringAns)
                setFirstNum("")
                setSecondNum("")
                setOp(backUpOp)
            }
            catch {
                console.log('doink4')
                opScreenSet(answer)
                setAnswer(answer)
            }
        }
    }

    const clearScreen = () => {
        setResult("")
        opScreenSet("")
        setFirstNum("")
        setSecondNum("")
        setAnswer("")
        setBackUpOp("")
        setOp("")
    }

    const inverse = () => {
        if (answer) {
            let realnumber = parseFloat(answer)
            setAnswer('')
            setResult((realnumber * -1).toString())
        } else if (!answer && result) {
            let realnumber = parseFloat(result)
            setResult((realnumber * -1).toString())
        }
    }

    const keyvalue = (value) => {
        if (value) {
            if (!result) {
                if (answer) {
                    setAnswer('')
                    setResult(value)
                    setFirstNum(answer)
                    setOp(backUpOp)
                    setSecondNum('')
                    console.log('a')
                } else {
                    setResult(value)
                    console.log('b')
                }
            } else if (result) {
                if (answer) {
                    console.log('c')
                    setAnswer('')
                    setResult(value)
                    setFirstNum(answer)
                    setOp(backUpOp)
                    setSecondNum('')
                } else if (result.length >= 100) {
                    return
                } else if (result.includes('.') && value === '.') {
                    return
                } else {
                    setResult(result + value)
                }
            }
        }
    }

    useEffect(() => {
        if (timing) {
            doMath()
            setTiming(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timing])

    useEffect(() => {
        if (timing2) {
            doMathEqual()
            setTiming2(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timing2])

    return (
        <OperandContext.Provider
            value={{ firstNum, setFirstNum, secondNum, setSecondNum, opScreen, opScreenSet, op, setOp, timing, setTiming, setResult, result, answer, setAnswer, inverse, keyvalue, operand, clearScreen }}>
            {props.children}
        </OperandContext.Provider>
    );
}