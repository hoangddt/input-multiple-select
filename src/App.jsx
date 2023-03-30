import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Collapse } from 'antd';
import './App.css'
import CreateNewAudienceForm from './components/NewAudience';


const { Panel } = Collapse;


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full">
      <p>I am stuck with the UI components as the behavior below</p>
      <p>Please provide any guidance or direction to achieve the expected behavior</p>
      <p>Thank you for reading</p>
      <div className="rounded-lg border">
        <Collapse ghost>
            <Panel header="Expected behavior (click)" key="1">
              <div>
                <img src="/01.selection_multiple.png" />
                <img src="/02.sumarise_selection_result.png" />
              </div>
            </Panel>
        </Collapse>
      </div>
      <div className="rounded-lg border mt-4">
        <Collapse ghost>
            <Panel header="Current implementation (click)" key="1">
              <CreateNewAudienceForm />
            </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default App
