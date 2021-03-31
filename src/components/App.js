import React from 'react'

import CalcFrame from '../components/CalcFrame'
import { OpStore } from '../contexts/OperandContext'

class App extends React.Component {
    render() {
        return (
            <main>
                <div className="wrapper">
                    <OpStore>
                        <CalcFrame />
                    </OpStore>
                </div>
            </main>
        )
    }
}

export default App