import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { Body, Feed, Login, Profile } from './components';
import appStore from './store/appStore';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
