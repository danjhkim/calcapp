import React, { useState } from 'react';

export const MathContext = React.createContext();

export const MathStore = (props) => {
    const [result, setResult] = useState('')

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

    return (
        <MathContext.Provider
            value={{ setResult, result, keyvalue }}>
            {props.children}
        </MathContext.Provider>
    );
}
