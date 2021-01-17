import './App.css';
import { useEffect, useState,useRef } from "react";

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const inputRef = useRef(null);
  const YOUR_APP_ID = "5ae8468b";
  const YOUR_APP_KEY = "cb91d10bf031121819ac30bd86a18926";

  const search = () =>{
    searchForRecipe(inputRef.current.value);
  }
  const searchForRecipe = (query) =>{
    let url = `search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=100&calories=591-722&health=vegetarian`;
    fetch(url)
      .then(response =>{
        return response.json()
      })
      .then(res=>{
        console.log(res.hits);
        updateIngredientList(res.hits);
        // setPageCount(res.nbPages); 
                            
      })
      .catch(err => console.log("error", err));
  }

  // const handlePageChange = (selectedObject) => {
	// 	setcurrentPage(selectedObject.selected);
	// 	search();
	// };
  useEffect(() => {
    searchForRecipe('noodles');
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input ref={inputRef} placeholder="Search for recipe"/>
          <button onClick={search}>Search</button>
        </div>
        <div className="Wrapper-list">
          {ingredientList.map((item) => {
            return(
              <div className="Ingredient-card">
                <span>{item.recipe.label}</span>
                <img src={item.recipe.image}/>
                <div className="steps">
                  {item.recipe.ingredientLines.map((step)=>{
                    return <p>{step}</p>;
                  })} 
                </div>
                <h5>Calori&nbsp;<strong>{item.recipe.calories}</strong></h5>
              </div>
            )
          })}
        </div>

        
      </header>
    </div>
  );
}

export default App;
