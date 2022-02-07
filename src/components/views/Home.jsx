import { useState } from "react";
import { useFetchSuperherosQuery } from "../../redux/superheros/superheroSlice";
import SuperherosList from "../SuperherosList";
import Loader from "../Loader";
import SetPage from "../SetPage";
import s from "./Home.module.css";

export default function Home() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const { data = [], isFetching } = useFetchSuperherosQuery(page);

  return (
    <>
      {isFetching && <Loader />}
      <h1 className={s.title}>SUPERHEROS</h1>
      <SuperherosList superheros={data}></SuperherosList>
      {data.length > 4 && (
        <>
          <SetPage onClick={prevPage} title='Prev Page' />
          <SetPage onClick={nextPage} title='Next Page' />
        </>
      )}
    </>
  );
}
