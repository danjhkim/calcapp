import React, { useContext } from 'react'

import { OperandContext } from "../contexts/OperandContext"

const Buttons = () => {
    const opcontext = useContext(OperandContext)

    return (
        <div className="pad">
            <table>
                <tbody>
                    <tr><td className="clear" colSpan="3" onClick={opcontext.clearScreen}>clear</td><td className="divide" onClick={() => opcontext.operand('÷')}>÷</td></tr>
                    <tr><td onClick={() => opcontext.keyvalue("7")}>7</td><td onClick={() => opcontext.keyvalue("8")}>8</td><td onClick={() => opcontext.keyvalue("9")}>9</td><td onClick={() => opcontext.operand('x')} >x</td></tr>
                    <tr><td onClick={() => opcontext.keyvalue("4")}>4</td><td onClick={() => opcontext.keyvalue("5")}>5</td><td onClick={() => opcontext.keyvalue("6")}>6</td><td onClick={() => opcontext.operand('-')}>-</td></tr>
                    <tr><td onClick={() => opcontext.keyvalue("1")}>1</td><td onClick={() => opcontext.keyvalue("2")}>2</td><td onClick={() => opcontext.keyvalue("3")}>3</td><td onClick={() => opcontext.operand('+')}>+</td></tr>
                    <tr><td className="inverse" onClick={() => opcontext.inverse()}>±</td><td className="clear" onClick={() => opcontext.keyvalue("0")}>0</td>
                        <td onClick={() => opcontext.keyvalue('.')}>.</td><td className="equal" onClick={() => opcontext.operand('=')}>=</td></tr>
                </tbody>
            </table>
        </div >
    );
}

export default Buttons;