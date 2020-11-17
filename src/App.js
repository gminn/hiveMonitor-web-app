/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { createHive } from './graphql/mutations'
import { listHives } from './graphql/queries'
import { getHive } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { id: '', deviceId: '', temp: '' , humidity: '', co2: '', tvoc: '', freq: '', timeStamp: ''}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [hives, setHives] = useState([])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  // useEffect(() => {
  //   fetchHives()
  // }, [])

  async function fetchHives() {
    try {
      const hive = await API.graphql(graphqlOperation(listHives))
      const hiveData = hive.data.listHives.items
      console.log("Fetching hives")
      console.log(hiveData)
      setHives(hiveData)
    } catch (err) { console.log('Error fetching hive data')}
  }

  async function fetchOneHive() {
    try {
      if (!formState.id) return
      const hive = await API.graphql(graphqlOperation(getHive, { id: formState.id }))
      console.log(formState.deivceId)
      setHives([hive.data.getHive])
      setFormState(initialState)
      console.log("New Data Incoming")
      console.log(hive.data.getHive)
    } catch (err) { console.log('Error fetching data from one hive')}
  }

  async function addHive() {
    try {
      if (!formState.id || !formState.temp) return
      const newHive = { ...formState }
      setHives([...hives, newHive])
      setFormState(initialState)
      console.log("Added a hive!")
      console.log(newHive)
      await API.graphql(graphqlOperation(createHive, {input: newHive}))
    } catch (err) {
      console.log('Error creating hive:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Hive Data</h2>
      <input
        onChange={event => setInput('id', event.target.value)}
        style={styles.input}
        value= {formState.id}
        placeholder="Id"
      />
      <button style={styles.button} onClick={fetchOneHive}>Press for New Hive Data</button>
      {
        hives.map((hive, index) => (
          <div key={hive.id ? hive.id : index} style={styles.hive}>
            <div style={styles.data}>
              <div style={styles.hiveName}>Id</div>
              <div style={styles.hiveDescription}>{hive.id}</div>
            </div>
            <div style={styles.data}>
              <div style={styles.hiveName}>Timestamp</div>
              <div style={styles.hiveDescription} >{hive.timeStamp}</div>
            </div>
            <div style={styles.data}>
              <div style={styles.hiveName}>Temperature</div>
              <div style={styles.hiveDescription} >{hive.temp}</div>
              <div style={styles.hiveDescription} >degrees C</div>
            </div>
            <div style={styles.data}>
              <div style={styles.hiveName}>Humidity</div>
              <div style={styles.hiveDescription}>{hive.humidity}</div>
              <div style={styles.hiveDescription}>%</div>
            </div>
            <div style={styles.data}>
              <div style={styles.hiveName}>CO2</div>
              <div style={styles.hiveDescription} >{hive.co2}</div>
              <div style={styles.hiveDescription} >ppm</div>
            </div>
            <div style={styles.data}>
              <div style={styles.hiveName}>TVOC</div>
              <div style={styles.hiveDescription} >{hive.tvoc}</div>
              <div style={styles.hiveDescription} >???</div>
            </div>
            <div style={styles.data}>
              <div style={styles.hiveName}>Frequency</div>
              <div style={styles.hiveDescription} >{hive.freq}</div>
              <div style={styles.hiveDescription} >Hz</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  data: { display: 'flex', justifyContent: 'space-between' },
  hive: {  marginBottom: 30, padding: 20 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  hiveName: { fontSize: 20, fontWeight: 'bold' },
  hiveDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App)