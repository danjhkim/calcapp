import React, { useState, useEffect, useRef, useContext } from 'react'
import Buttons from './Buttons';

import { OperandContext } from "../contexts/OperandContext"


const CalcFrame = () => {
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
    }, [opcontext.result, opcontext.answer])

    return (
        <div className="calcbody">
            <div className="calcscreen">
                <div className="openrand">{opcontext.opScreen}</div>
                <div className="result"><div className="autoscale" style={{ transform: `scale(${scale},${scale})` }} ref={node}>{opcontext.answer ? opcontext.answer : opcontext.result}</div></div>
                {/* this solves the issue of saving the answer and having to the result refresh nice */}
            </div>
            <Buttons />
        </div >
    );
}

export default CalcFrame;