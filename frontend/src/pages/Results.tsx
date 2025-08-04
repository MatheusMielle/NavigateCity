import { useLocation } from "react-router-dom"; 
import WarningMessages from "../components/WarningMessages";
import Museum from "../components/Museum";
import Park from "../components/Park";
import Sight from "../components/Sight";
import Restaurant from "../components/Restaurant";
import Dish from "../components/Dish";
import "../styles/Results.css";
import Header from "../components/Header";

const Results = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const locationType = params.get("location");
  const name = params.get("name");
  const category = params.get("category");
    
  const categoryComponents: { [key: string]: React.FC<any> } = {
    park: Park,
    museum: Museum,
    famous_sight: Sight,
    restaurant: Restaurant,
    food: Dish
  };
  const CategoryComponent = categoryComponents[category?.toLowerCase() || ""];

  return (
    <div className="results-container">
      <Header />
      {CategoryComponent === undefined ? (
        <WarningMessages type="error" message="Category not found" />
      ) : (
        <CategoryComponent
          location={locationType ?? ""}
          name={name ?? ""}
          category={category ?? ""}
        />
      )}
    </div>
  );
};


export default Results;