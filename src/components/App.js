import React from 'react'

import CalcFrame from '../components/CalcFrame'
import { MathStore } from '../contexts/MathContext';
import { OpStore } from '../contexts/OperandContext'

class App extends React.Component {
    render() {
        return (
            <main>
                <div className="wrapper">
                    <MathStore>
                        <OpStore>
                            <CalcFrame />
                        </OpStore>
                    </MathStore>
                </div>
            </main>
        )
    }
}

export default App