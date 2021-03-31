import React, { useState, useEffect, useRef } from 'react'

const CalcFrame = () => {
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
    const [scale, setScale] = useState(1)
    const [answer, setAnswer] = useState("")
    const [timing2, setTiming2] = useState(false)
    const node = useRef()

    useEffect(() => {
        const parentNode = node.current.parentNode
        const availableWidth = parentNode.offsetWidth
        const actualWidth = node.current.offsetWidth
        const actualScale = availableWidth / actualWidth

        if (scale === actualScale)
            return

        if (actualScale < 1) {
            setScale(actualScale)
        } else if (scale < 1) {
            setScale(1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result])

    const operand = (value) => {
        if (value === "=") {
            if (firstNum && secondNum) {
                setBackUpOp(value)
                setAnswer(result)
                setTiming2(true)
            } else if (firstNum && !secondNum) {
                if (result) {
                    setBackUpOp(value)
                    setSecondNum(result)
                    setTiming2(true)
                } else {
                    if (answer) {
                        opScreenSet(`${answer}`)
                        setOp("")
                        setResult('')
                    } else {
                        setOp("")
                    }
                }
            } else {
                // setAnswer(result)
                setBackUpOp(value)
                setTiming2(true)
            }
        } else {
            if (!firstNum) {
                setFirstNum(result)
                setOp(value)
                setBackUpOp(value)
                if (answer) {
                    opScreenSet(`${answer} ${value}`)
                    setResult('')
                } else {
                    opScreenSet(`${result} ${value}`)
                    setResult('')
                }
            } else if (firstNum && !secondNum && !result) {
                setOp(value)
                if (answer) {
                    opScreenSet(`${answer} ${value}`)
                } else {
                    opScreenSet(`${firstNum} ${value}`)
                }
            } else if (firstNum && !secondNum && result) {
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
            opScreenSet(result)
            setAnswer(result)
        } else if (!secondNum) {
            opScreenSet(answer)
            setAnswer(answer)
        } else {
            try {
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
                } else {
                    setResult(value)
                }
            } else if (result) {
                if (answer) {
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
        <div className="calcbody">
            <div className="calcscreen">
                <div className="openrand">{opScreen}</div>
                <div className="result"><div className="autoscale" style={{ transform: `scale(${scale},${scale})` }} ref={node}>{answer ? answer : result}</div></div>
                {/* this solves the issue of saving the answer and having to the result refresh nice */}
            </div>
            <div className="pad">
                <table>
                    <tbody>
                        <tr><td className="clear" colSpan="3" onClick={clearScreen}>clear</td><td className="divide" onClick={() => operand('÷')}>÷</td></tr>
                        <tr><td onClick={() => keyvalue("7")}>7</td><td onClick={() => keyvalue("8")}>8</td><td onClick={() => keyvalue("9")}>9</td><td onClick={() => operand('x')} >x</td></tr>
                        <tr><td onClick={() => keyvalue("4")}>4</td><td onClick={() => keyvalue("5")}>5</td><td onClick={() => keyvalue("6")}>6</td><td onClick={() => operand('-')}>-</td></tr>
                        <tr><td onClick={() => keyvalue("1")}>1</td><td onClick={() => keyvalue("2")}>2</td><td onClick={() => keyvalue("3")}>3</td><td onClick={() => operand('+')}>+</td></tr>
                        <tr><td className="inverse" onClick={() => inverse()}>±</td><td className="clear" onClick={() => keyvalue("0")}>0</td>
                            <td onClick={() => keyvalue('.')}>.</td><td className="equal" onClick={() => operand('=')}>=</td></tr>
                    </tbody>
                </table>
            </div >
        </div >
    );
}

export default CalcFrame;