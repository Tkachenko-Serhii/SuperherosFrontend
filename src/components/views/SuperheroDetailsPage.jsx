import { Suspense } from "react";
import {
  useFetchSuperheroByIdQuery,
  useDeleteSuperheroMutation,
} from "../../redux/superheros/superheroSlice";
import {
  useParams,
  useNavigate,
  useLocation,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { alert } from "@pnotify/core";

import Loader from "../Loader";
import CreateSuperheroPage from "../CreateSuperheroPage";
import s from "./SuperheroDetailsPage.module.css";

export default function SuperheroDetailsPage() {
  const [deleteSuperhero, { isLoading: isDeleting }] =
    useDeleteSuperheroMutation();
  const { id } = useParams();
  const { data, isFetching, isSuccess } = useFetchSuperheroByIdQuery(id);

  const location = useLocation();
  const navigation = useNavigate();

  const onClickBack = () => {
    const { from } = location.state;
    navigation(from);
  };

  isDeleting &&
    alert({
      type: "warning",
      text: `Superhero ${data.nickname} was deleted!`,
    });

  return (
    <>
      {isFetching && <Loader />}
      {data === [] &&
        alert({
          type: "error",
          text: `No superhero for request`,
        })}
      {isSuccess && (
        <>
          <button type='button' className={s.button} onClick={onClickBack}>
            Back
          </button>

          <div className={s.container}>
            <div className={s.superhero_img}>
              {data.avatarURL === "" ? (
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
                  alt={data.nickname}
                />
              ) : (
                <img
                  src={`http://localhost:3000/api/superheros/${data.avatarURL}`}
                  alt={data.nickname}
                />
              )}
            </div>
            <div>
              <div className={s.description}>
                <h2 className={s.title}>{data.nickname}</h2>
                <h3 className={s.title__mod}>{data.real_name}</h3>
                <p className={s.overviev}>{data.origin_description}</p>
                <p className={s.overviev}>{data.superpowers}</p>
                <p className={s.overviev}>{data.catch_phrase}</p>
              </div>
              <button
                className={s.button}
                onClick={(e) => {
                  deleteSuperhero(data._id);
                  onClickBack();
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <Link
                to={{
                  pathname: "update",
                }}
                state={location.state}
              >
                <button className={s.button}>Update</button>
              </Link>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route
                    path='update'
                    element={
                      <CreateSuperheroPage
                        btnTitle='update'
                        id={data._id}
                      ></CreateSuperheroPage>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </>
  );
}
