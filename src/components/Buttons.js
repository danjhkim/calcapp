import React, { useState, useContext } from 'react'
import { MathContext } from "../contexts/MathContext";
import { OperandContext } from "../contexts/OperandContext"

const Buttons = () => {
    const mathcontext = useContext(MathContext)
    const opcontext = useContext(OperandContext)

    const clearScreen = () => {
        mathcontext.setResult('')
        opcontext.opScreenSet('')
        opcontext.setFirstNum('')
        opcontext.setSecondNum('')
    }

    return (
        <div className="pad">
            <table>
                <tbody>
                    <tr><td className="clear" colSpan="3" onClick={clearScreen}>clear</td><td className="divide" onClick={() => opcontext.operand('÷')}>÷</td></tr>
                    <tr><td onClick={() => mathcontext.keyvalue("7")}>7</td><td onClick={() => mathcontext.keyvalue("8")}>8</td><td onClick={() => mathcontext.keyvalue("9")}>9</td><td onClick={() => opcontext.operand('x')} >x</td></tr>
                    <tr><td onClick={() => mathcontext.keyvalue("4")}>4</td><td onClick={() => mathcontext.keyvalue("5")}>5</td><td onClick={() => mathcontext.keyvalue("6")}>6</td><td onClick={() => opcontext.operand('-')}>-</td></tr>
                    <tr><td onClick={() => mathcontext.keyvalue("1")}>1</td><td onClick={() => mathcontext.keyvalue("2")}>2</td><td onClick={() => mathcontext.keyvalue("3")}>3</td><td onClick={() => opcontext.operand('+')}>+</td></tr>
                    <tr><td className="inverse" onClick={() => mathcontext.keyvalue("-")}>±</td><td className="clear" onClick={() => mathcontext.keyvalue("0")}>0</td>
                        <td onClick={() => mathcontext.keyvalue('.')}>.</td><td className="equal" onClick={() => opcontext.operand('=')}>=</td></tr>
                </tbody>
            </table>
        </div >
    );
}

export default Buttons;