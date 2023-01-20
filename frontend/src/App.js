import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Start from 'pages/Start/Start';
import StartLogin from 'pages/Start/StartLogin';
import StartNickname from 'pages/Start/StartNickname';
import Example from 'pages/Example/Example';
import TopBar1 from 'components/common/TopBar1';
import BottomNav from 'components/common/BottomNav';
import BottomBar from 'components/common/BottomBar';
import Item from 'pages/Item/Item';
import ItemCreate from 'pages/Item/ItemCreate';
function App() {
  return (
    <BrowserRouter className="App">
      <TopBar1 />
      <Routes>
        <Route path="/start" element={<Start />}>
          <Route path="" element={<StartLogin />} />
          <Route path="nickname" element={<StartNickname />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/item/create" element={<ItemCreate />} />
      </Routes>
      <BottomBar />
      <BottomNav />
    </BrowserRouter>

    // <BrowserRouter id="app" className="App">
    //     <Routes>

    //       <Route path="/" element={<Home />} />
    //       <Route path="/example" element={<Example />} />
    //     </Routes>
    //   </BrowserRouter>
  );
}

export default App;
