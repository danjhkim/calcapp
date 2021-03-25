import React from 'react'

import CalcFrame from '../components/CalcFrame'

class App extends React.Component {
    render() {
        return (
            <main>
                <div className="wrapper">
                    <CalcFrame />
                </div>
            </main>
        )
    }
}

export default App