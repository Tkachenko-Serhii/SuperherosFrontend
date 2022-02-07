import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";

const Home = lazy(() =>
  import("./components/views/Home" /* webpackChunkName: "home-page" */)
);
const SuperherosList = lazy(() =>
  import(
    "./components/SuperherosList" /* webpackChunkName: "superheros-page" */
  )
);
const SuperheroDetailsPage = lazy(() =>
  import(
    "./components/views/SuperheroDetailsPage" /* webpackChunkName: "superhero-details" */
  )
);

const CreateSuperheroPage = lazy(() =>
  import(
    "./components/CreateSuperheroPage" /* webpackChunkName: "superhero-create" */
  )
);

export default function App() {
  return (
    <div className='container'>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/superheros' element={<SuperherosList />} />
          <Route path='/superheros/:id/*' element={<SuperheroDetailsPage />} />
          <Route
            path='/superheros/create'
            element={
              <CreateSuperheroPage
                title='Create new Superhero'
                btnTitle='create'
              ></CreateSuperheroPage>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}
