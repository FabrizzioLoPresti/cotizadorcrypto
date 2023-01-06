import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
margin-top: 30px;
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition-property: background-color;
  transition-duration: .3s;
  transition-timing-function: ease-in;
  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

const Formulario = ({setMonedas}) => {

  const [error, setError] = useState(false)
  const [cryptos, setCryptos] = useState([])

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
  const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu Criptomoneda', cryptos)
  // SelectMonedas()

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      // Utilizamos un Return
      // const arrayCryptos = resultado.Data.map(crypto => {
      //   return {
      //     id: crypto.CoinInfo.Name,
      //     nombre: crypto.CoinInfo.FullName,
      //   }
      // })
      // Return Implicito
      const arrayCryptos = resultado.Data.map(crypto => ({
        id: crypto.CoinInfo.Name,
        nombre: crypto.CoinInfo.FullName
      }))
      setCryptos(arrayCryptos)
    }
    consultarAPI()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    
    if([moneda, criptomoneda].includes('')) return setError(true)

    setError(false)
    setMonedas({moneda, criptomoneda})
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptomonedas />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario