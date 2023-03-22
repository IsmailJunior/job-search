import { useEffect, useState } from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import {ClipLoader} from 'react-spinners'
import styled from 'styled-components'
import axios from 'axios'

function App ()
{

  const [ search, setSearch ] = useState( [] );
  const [term, setTerm] = useState(null)
  const [ showResult, setShowResult ] = useState( false )
  const [loading, setLoading] = useState(false)
  
  const showResultHandler = () =>
  {
    setShowResult( true )
  }



  const getNews = async (term) =>
  {
    setLoading(true)
    try
    {
    const res = await axios( {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
      query: term,
      page: 1,
      num_pages: '1'
    }, 
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "f6134ebf80msh0949d7f7e58dbd4p1d3c0djsn3d77abc69828",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
    } )
      setSearch( res.data.data )
      setLoading(false)
      console.log(res.data.data)
    } catch ( error )
    {
      console.error(error)
    }
  }

    const searchHandler = (e) =>
    {
      if ( e.target.value.length >= 3 )
      {
        setTerm(e.target.value)
      }
    }
    
  window.addEventListener( 'keydown', ( e ) =>
  {
    if ( e.keyCode === 13 )
    {
      setShowResult(true)
      getNews(term)
    }
  } )

  const content = !loading ? ( <Result> { search.map( ( term, i ) => (
    <Item key={ i }>
      <a style={ { color: 'gray', textDecoration: 'none' } } target={ '_blank' } href={ term.job_apply_link }>
        <h4>{ term.job_title }</h4>
      </a>
    </Item>
  ) ) } </Result>) : <ClipLoader color='gray' />
  
  return (
    <Container>
      <Wraper>
        <Input  onChange={searchHandler} type='text' />
        <Icon>
            <HiOutlineMagnifyingGlass  color='gray' />
        </Icon>
        { showResult ?
          <Houser>
            {content}
          </Houser>
      : null}
      </Wraper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  }
`

const Input = styled.input`
  width: 500px;
  height: 30px;
  color: black;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50px;
  border: 1px gray solid;
  padding: 10px;
  padding-left: 50px;
  caret-color: black;
  &:focus {
    outline-width: 0;
  }

   @media only screen and (max-width: 600px) {
  & {
      width: 400px;
  }
}
`
const Wraper = styled.div`
  position: relative;
`

const Icon = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
`

const Result = styled.ul`
  position: absolute;
  background-color: white;
  color: black;
  width: 503px;
  padding: 10px 30px;
  padding-top: 5px;
  border-radius: 20px;
  border: 1px gray solid;
  top: 50px;
  left: -1px;
  list-style: none;
    @media only screen and (max-width: 600px) {
  & {
      width: 400px;
  }
`

const Item = styled.li`
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
`

const Houser = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  width: 503px;
`

export default App
