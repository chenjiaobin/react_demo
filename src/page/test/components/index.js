import React from 'react'
import ComponentHeader from  './header.js'
import ComponentBody from  './bodyIndex.js'
import ComponentBottom from  './footer.js'

function Home () {
  return (
    <div>
      <ComponentHeader name="我是阿布"/>
      <ComponentBody userId={123456} sex="male"/>
      <ComponentBottom/>
    </div>
  )
}


export default Home