import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const Stat: FC = () => {
  const { id = '' } = useParams()
  return <p>Stat {id}</p>
}

export default Stat
