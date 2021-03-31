import React, { useState, useEffect, useRef } from 'react'

const CalcFrame = () => {
    var operators = {
        "+": function (a, b) { return a + b },
        "-": function (a, b) { return a - b },
        "x": function (a, b) { return a * b },
        "÷": function (a, b) { return a / b },
        '=': function (a, b) { return b }
    };

    const [result, setResult] = useState('')
    const [firstNum, setFirstNum] = useState('')
    const [secondNum, setSecondNum] = useState('')
    const [opScreen, opScreenSet] = useState('')
    const [op, setOp] = useState(null)
    const [timing, setTiming] = useState(false)
    const [scale, setScale] = useState(1)
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
        if (!firstNum) {
            console.log('first')
            setFirstNum(result)
            setOp(value)
            opScreenSet(`${result} ${value}`)
            setResult('')
        } else if (firstNum && result) {
            if (value === op) {
                if (!secondNum) {
                    setSecondNum(result)
                    setTiming(true)
                } else if (secondNum && firstNum) {
                    setFirstNum(result)
                    setTiming(true)
                }
            } else if (value === '=') {
                if (!secondNum) {
                    console.log('test')
                    setSecondNum(result)
                    setTiming(true)
                } else if (secondNum && firstNum) {
                    setFirstNum(result)
                    setTiming(true)
                }
            } else if (value !== op) {
                console.log('boom!')
                setFirstNum(result)
                setSecondNum('')
                setOp(value)
                opScreenSet(`${result} ${value}`)
                setResult('')
            }
        }
    }

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
            setResult(result + value)
        } else {
            setResult(value)
        }
    }

    const clearScreen = () => {
        setResult('')
        opScreenSet('')
        setFirstNum('')
        setSecondNum('')
    }

    const doMath = (op) => {
        let parseNum1 = parseFloat(firstNum)
        let parseNum2 = parseFloat(secondNum)
        let ans = operators[op](parseNum1, parseNum2)
        let stringAns = ans.toString()
        if (stringAns.length >= 12) {
            let covertednum = ans.toPrecision(10)
            setResult(covertednum)
            opScreenSet('')
        } else {
            setResult(stringAns)
            opScreenSet('')
        }
    }

    useEffect(() => {
        if (timing) {
            doMath(op)
            setTiming(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timing])

    return (
        <div className="calcbody">
            <div className="calcscreen">
                <div className="openrand">{opScreen}</div>
                <div className="result"><div className="autoscale" style={{ transform: `scale(${scale},${scale})` }} ref={node}>{result}</div></div>
            </div>
            <div className="pad">
                <table>
                    <tbody>
                        <tr><td className="clear" colSpan="3" onClick={clearScreen}>clear</td><td className="divide" onClick={() => operand('÷')}>÷</td></tr>
                        <tr><td onClick={() => keyvalue("7")}>7</td><td onClick={() => keyvalue("8")}>8</td><td onClick={() => keyvalue("9")}>9</td><td onClick={() => operand('x')} >x</td></tr>
                        <tr><td onClick={() => keyvalue("4")}>4</td><td onClick={() => keyvalue("5")}>5</td><td onClick={() => keyvalue("6")}>6</td><td onClick={() => operand('-')}>-</td></tr>
                        <tr><td onClick={() => keyvalue("1")}>1</td><td onClick={() => keyvalue("2")}>2</td><td onClick={() => keyvalue("3")}>3</td><td onClick={() => operand('+')}>+</td></tr>
                        <tr><td className="inverse" onClick={() => keyvalue("-")}>±</td><td className="clear" onClick={() => keyvalue("0")}>0</td>
                            <td onClick={() => keyvalue('.')}>.</td><td className="equal" onClick={() => operand('=')}>=</td></tr>
                    </tbody>
                </table>
            </div >
        </div >
    );
}

export default CalcFrame;