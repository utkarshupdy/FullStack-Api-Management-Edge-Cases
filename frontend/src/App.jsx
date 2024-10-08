import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // U CAN ALSO MAKE ALL THIS FXN AS A CUSTOM HOOK
  const [products, setProducts] = useState([])
  const [error , setError] = useState(false)
  const [loading , setLoading] = useState(false)
  const [search , setSearch] = useState('')

  useEffect(()=>{
    const controller = new AbortController() // we using this to avoid race condition .. like on typoing ROHIT , we only get updated data of ROHIT , not from data for typmg R , RO , ROH , ROHI ...
    // axios.get('/api/products').then((res)=>res.json()).then((res)=>{}) // this is ok , but what if we want to wait till my data is not fetched from api , we use await here ...
    // const response = await axios.get()  // but scene is fopr using await , we have to use async .. but where to use async
    // for this we use ' ()() 'iffy (immideiatlry invoked fxn)

    // we neever know if prev fxn is running nd iffy used here , for better practise use semicolon ; before using iffy to end all prev line codes before start executing iffy
    ;(async()=>{
      try {
        setLoading(true)
        setError(false)//for maintaining edge case
        // const response = await axios.get('/api/products?search=' + search) //THE ISSUE IN THIS IS THAT , ON TYPING SINLGE CHAR , IOT CALLS THE API , LIKE ON TYPING ROHIT IT CALLS API FOR 5 TIME , BUT WE ONLY NEED RESPONSE OF ROHIT , NOT FOR R , RO , ROH , ROHI ... FOR THIS WE USING ABORTCONTROLLLER METHOD PROVIDED BY AXIOS
        const response = await axios.get('/api/products?search=' + search , {
          signal: controller.signal // this does that if sem req hits on same url ... it delete all prev request .. but one issue is that it send it to catch block , for that  we have to hanfle it via a proper axios method in catch block 'axiox.isCancel((error))' 
        })
        console.log(response.data);
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        if(axios.isCancel(error)){   // for handling axios error cases 
          console.log('Request canceled' , error.message)
          return;
        }
        setError(true)
        setLoading(false)
      }
    })()

    // its now tym for cleanup the code i.e. if some fxn / component is mounted .. we also have to unkount int for saving memory .. i.e. is any eventlister is apply on some btn .. we cann't left that operation untouched .. we also hav e to abort it for saving memory ...
    //cleanup
    return()=>{
      controller.abort()
    } 
  } 
  , [search])

  // const [products , error , loading] = customReactQuery('/api/products?search=' + search)


  //IF WANT TO DO ALL THING IN JUST 1 RETURN STATEMENT
  if (error) {  // first method
    return <h1>Something went wrong</h1>
  }
  if (loading) {
    return <h1>Loading..........</h1>
  }

  return (
    <>
      <h1>Hello API Developers</h1>
      <input type="text" placeholder="Search"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />

      {/* if( loading && <h1>Loading...</h1>)
      if(error && <h1>Something went wrong</h1>) */}
      <h2>Number of products are : {products.length}</h2>
    </>
  )
}

export default App


// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     // axios.get('/api/products').then((res)=>res.json()).then((res)=>{}) // this is ok , but what if we want to wait till my data is not fetched from api , we use await here ...
//     // const response = await axios.get()  // but scene is fopr using await , we have to use async .. but where to use async
//     // for this we use ' ()() 'iffy (immideiatlry invoked fxn)

//     // we neever know if prev fxn is running nd iffy used here , for better practise use semicolon ; before using iffy to end all prev line codes before start executing iffy
//     ;(async () => {
//       try {
//         setLoading(true)
//         setError(false)//for maintaining edge case
//         // const response = await axios.get('/api/products')
//         const response = await axios.get(urlPath)
//         console.log(response.data);
//         setProducts(response.data)
//         setLoading(false)
//       } 
//       catch (error) {
//         setError(true)
//         setLoading(false)
//       }
//     })()
//   }, [search])
//   return [products ,error , loading]

// }