import React, {useState, useEffect} from 'react'


function useGiphy(query){
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        async function fetchData(){
            try{
                const response = await fetch(
                   `https://api.giphy.com/v1/gifs/search?api_key=UgZiSKVzEPG0qHj2kXWRw2H0s0pi02jT&q=${query}&limit=10&offset=0&rating=g&lang=en`

                );
                const json = await response.json()
       setResults(
         json.data.map(items =>{
             return items.images.preview.mp4
         })
)
                
            }catch (error) {}
        } 
         if(query !== ''){
           fetchData()

         }
    }, [query])
    return [results, loading]
   
}

function Giphy() {
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    const [results, loading]  = useGiphy(query)

    
    return (
        <div>
            <h1> ASK FOR A GIPHY NOW...</h1>
            <form
             onSubmit={e => {
                 e.preventDefault()
                 setQuery(search)
             }}
            >

            <input type="text"
            value={search}
            placeholder = "Search for giphy"
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Submit</button>
            </form>
            <br/>

            {loading ? (
                <h1>Give Me Gifs</h1>
            ) : (
                results.map(item => (
                    <video autoPlay loop key={item} src={item}/>
                    ))
            )}
            
          
        

        </div>
    )
}

export default Giphy
