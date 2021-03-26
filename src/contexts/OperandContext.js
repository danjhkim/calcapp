import React, { useState, useContext } from 'react';

import { MathContext } from "./MathContext";


export const OperandContext = React.createContext();

export const OpStore = (props) => {
    const mathcontext = useContext(MathContext)

    const [firstNum, setFirstNum] = useState('')
    const [secondNum, setSecondNum] = useState('')
    const [opScreen, opScreenSet] = useState('')
    const [op, setOp] = useState(null)
    const [timing, setTiming] = useState(false)


    const operators = {
        "+": function (a, b) { return a + b },
        "-": function (a, b) { return a - b },
        "x": function (a, b) { return a * b },
        "÷": function (a, b) { return a / b },
        '=': function (a, b) { return b }
    };

    const operand = (value) => {
        if (!firstNum) {
            console.log('first')
            setFirstNum(mathcontext.result)
            setOp(value)
            opScreenSet(`${mathcontext.result} ${value}`)
            mathcontext.setResult('')
        } else if (firstNum && mathcontext.result) {
            if (value === op) {
                if (!secondNum) {
                    setSecondNum(mathcontext.result)
                    setTiming(true)
                } else if (secondNum && firstNum) {
                    setFirstNum(mathcontext.result)
                    setTiming(true)
                }
            } else if (value === '=') {
                if (!secondNum) {
                    console.log('test')
                    setSecondNum(mathcontext.result)
                    setTiming(true)
                } else if (secondNum && firstNum) {
                    setFirstNum(mathcontext.result)
                    setTiming(true)
                }
            } else if (value !== op) {
                console.log('boom!')
                setFirstNum(mathcontext.result)
                setSecondNum('')
                setOp(value)
                opScreenSet(`${mathcontext.result} ${value}`)
                mathcontext.setResult('')
            }
        }
    }

    const doMath = (op) => {
        let parseNum1 = parseFloat(firstNum)
        let parseNum2 = parseFloat(secondNum)
        let ans = operators[op](parseNum1, parseNum2)
        let stringAns = ans.toString()
        if (stringAns.length >= 12) {
            let covertednum = ans.toPrecision(10)
            mathcontext.setResult(covertednum)
            opScreenSet('')
        } else {
            mathcontext.setResult(stringAns)
            opScreenSet('')
        }
    }

    return (
        <OperandContext.Provider
            value={{ firstNum, setFirstNum, secondNum, setSecondNum, opScreen, opScreenSet, op, setOp, operand, doMath, timing, setTiming }}>
            {props.children}
        </OperandContext.Provider>
    );
}