import './App.css';
import CardList from './component/CardList/CardList';
import Header from './component/Header/Header';
import SearchBar from './component/SearchBar/SearchBar';
import SearchResults from './component/SearchResults/SearchResults';

function App() {
  console.log("Running App...");
  return (
    <div className='container'>
      <Header/>
      <CardList
        title="Top Specialties"
        description="People have been looking for these specialties"
        url="http://localhost:8080/combinedspecialty"
        image_field="image_url"
        label_field="title"  
      />
      <CardList
        title="Common Conditions"
        description="Easily access doctors treating these conditions"
        url="http://localhost:8080/ailment"
        image_field="image_url"
        label_field="name"  
      />
    </div>
  );
}

export default App;
