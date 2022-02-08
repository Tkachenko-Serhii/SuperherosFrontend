import { useState } from "react";
import { useFetchSuperherosQuery } from "../../redux/superheros/superheroSlice";
import SuperherosList from "../SuperherosList";
import Loader from "../Loader";
import Button from "../Button";
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
        <div className={s.btnContainer}>
          <Button onClick={prevPage} title='Prev Page' type='button' />
          <Button onClick={nextPage} title='Next Page' type='button' />
        </div>
      )}
    </>
  );
}
