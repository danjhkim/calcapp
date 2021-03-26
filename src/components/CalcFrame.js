import React, { useState, useEffect, useRef, useContext } from 'react'

import Buttons from './Buttons'

import { MathContext } from "../contexts/MathContext";
import { OperandContext } from "../contexts/OperandContext"


const CalcFrame = () => {
    const mathcontext = useContext(MathContext)
    const opcontext = useContext(OperandContext)

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
    }, [mathcontext.result])

    useEffect(() => {
        if (opcontext.timing) {
            opcontext.doMath(opcontext.op)
            opcontext.setTiming(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opcontext.timing])

    return (
        <div className="calcbody">
            <div className="calcscreen">
                <div className="openrand">{opcontext.opScreen}</div>
                <div className="result"><div className="autoscale" style={{ transform: `scale(${scale},${scale})` }} ref={node}>{mathcontext.result}</div></div>
            </div>
            <Buttons />
        </div >
    );
}

export default CalcFrame;