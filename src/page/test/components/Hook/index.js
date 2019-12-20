import React, { useState, useEffect, useRef } from 'react'
import useSelf from './useSelf'

function Hook () {
  // 注：新的state和旧的state不会合并
  // 如果初始化一个值的比较昂贵，可以传入一个函数useState(() => { return  }
  const [count, setCount] = useState(1)
  const [age, setAge] = useState(18)
  const [name, setName] = useState('')

  // 在组件初始挂载的时候会执行， 每次更新的时候也会执行。解决了以往在componentDidMount和componentDidUpdate写一摸一样的代码
  // 也可以通过返回一个函数，这个函数会在组件销毁的时候执行，解决了以往监听事件和去除监听在不同生命周期上实现
  // 每次传递给useEffect的函数不同
  useEffect(() => {
    document.title = count
    console.log('只要dom更新我就会执行')
  })

  // 第二个参数可以作为性能优化，避免做无效的更新。也可以传递一个空数组，那这个effect只会在初始化的时候和销毁的时候才执行
  useEffect(() => {
    console.log('我只在count变化的时候我才执行，避免dom更新始终执行带来的性能问题，类似于class的componentDidUpdate')
  }, [count])

  // 自定义的变量不能跟调用的函数的变量名一样
  let firstName = useSelf(name)

  const nameChange = (e) => {
    setName(e.target.value)
  }

  const preRef = useRef()
  useEffect(() => {
    preRef.current = count 
  })
  const preCount = preRef.current

  return (
    <div>
      <div>
        <p>count数字是：{count}</p>
        <button onClick={ () => {setCount(count + 1)} }>加法count</button>
        <p>age数字是：{age}</p>
        <button onClick={ () => {setAge(age + 1)} }>加法age</button>
        <p>自定义HOOK：{firstName}</p>
        <input type="text" onChange={nameChange}/>
        <p>上一次的prop值：{preCount}</p>
      </div>
    </div>
  )
}

export default Hook