import { useContext } from "react";
import Categories from "../../components/categories-container/categories-container.component";
import { SignInContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {currentUser} = useContext(SignInContext);
  const navigate = useNavigate();
  return (
    <>
    {
      currentUser?
        <div className="App">
          <Categories></Categories>
        </div>:
        navigate('/')
    }
    </>
  );
};

export default Home;