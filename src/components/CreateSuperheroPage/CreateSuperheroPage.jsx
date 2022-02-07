import { useState } from "react";
import {
  useCreateSuperheroMutation,
  useUpdateSuperheroMutation,
} from "../../redux/superheros/superheroSlice";
import { alert } from "@pnotify/core";
import Loader from "../Loader";
import s from "./CreateSuperheroPage.module.css";

const CreateSuperheroPage = ({ title, btnTitle, id }) => {
  const [createSuperhero, { isLoading }] = useCreateSuperheroMutation();
  const [updateSuperhero] = useUpdateSuperheroMutation();

  const [nickname, setNickname] = useState("");
  const [real_name, setRealName] = useState("");
  const [origin_description, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catch_phrase, setCatchPhrase] = useState("");

  const handleCreateSuperhero = async () => {
    if ((nickname, real_name, origin_description, superpowers, catch_phrase)) {
      await createSuperhero({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      }).unwrap();
      setNickname("");
      setRealName("");
      setOriginDescription("");
      setSuperpowers("");
      setCatchPhrase("");
      alert({
        type: "success",
        text: "Superhero was created",
      });
    }
  };

  const handleUpdateSuperhero = async () => {
    if ((nickname, real_name, origin_description, superpowers, catch_phrase)) {
      await updateSuperhero({
        id,
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      }).unwrap();
      setNickname("");
      setRealName("");
      setOriginDescription("");
      setSuperpowers("");
      setCatchPhrase("");
      alert({
        type: "success",
        text: "Superhero was updated",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nickname === "" ||
      real_name === "" ||
      origin_description === "" ||
      superpowers === "" ||
      catch_phrase === ""
    ) {
      alert({
        type: "error",
        text: "Fill in the registration data",
      });
      return;
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <h1 className={s.title}>{title}</h1>

        <form onSubmit={handleSubmit} className={s.form} autoComplete='off'>
          <label className={s.label}>
            <span className={s.text}>Nickname</span>
            <input
              type='text'
              name='nickname'
              value={nickname}
              autoComplete='off'
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <span className={s.text}>Real name</span>
            <input
              type='text'
              name='real_name'
              value={real_name}
              autoComplete='off'
              onChange={(e) => setRealName(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <span className={s.text}>Description</span>
            <input
              type='text'
              name='origin_description'
              value={origin_description}
              onChange={(e) => setOriginDescription(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <span className={s.text}>Superpowers</span>
            <input
              type='text'
              name='superpowers'
              value={superpowers}
              onChange={(e) => setSuperpowers(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <span className={s.text}>Catch phrase</span>
            <input
              type='text'
              name='catch_phrase'
              value={catch_phrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <input type='file' name='avatarURL' />
          </label>

          <button
            type='submit'
            className={s.button}
            onClick={
              btnTitle === "update"
                ? handleUpdateSuperhero
                : handleCreateSuperhero
            }
          >
            {btnTitle}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSuperheroPage;
