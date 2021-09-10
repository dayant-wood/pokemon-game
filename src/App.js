import HeaderBlock from "./components/HeaderBlock/header";
import Footer from "./components/Footer/footer";
import Layout from "./components/Layout/layout";

import LandscapeImage from "./assets/bg3.jpg"
import './index.css'
import './App.css'

const App = () => {
 
  return (
    <div>
      <HeaderBlock title="This is new title" descr="This is new description!" />
      <Layout title="This is new title" descr="This is new description!" urlBg = {LandscapeImage} colorBg=''/>
      <Layout title="This is new title" descr="This is new description!" urlBg='' colorBg='lightblue'/>
      <Layout title="This is new title" descr="This is new description!" urlBg= {LandscapeImage} colorBg='' />
      <Footer />

      
    </div>
  );
};

export default App;