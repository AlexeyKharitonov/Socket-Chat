import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import { addUser, setCurrentUser } from "../../Redux/Users/Users";
import { IUser, formData } from "../../Types/index";
import { trimString } from "../../Utils/trimString";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MAINROOM, nicknameFormRules } from "../../Constants";

const NicknameForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<formData> = (data: formData) => {
    const user: IUser = {
      id: nanoid(),
      nickName: trimString(data.nickName),
    };
    dispatch(addUser(user));
    dispatch(setCurrentUser(user));
    navigate(`/chat?${MAINROOM}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full bg-[#2B2B2C] p-8 rounded-3xl"
    >
      <div className="flex flex-col">
        <label
          htmlFor="nickName"
          className="text-xl text-[#8A8A8A] font-semibold text-left mb-4"
        >
          Введите ваш никнейм
        </label>
        <input
          type="text"
          className="mb-5 text-[#8A8A8A] opacity-50 font-semibold text-base px-3 py-5 outline-none bg-[#232323] rounded-2xl text-center"
          placeholder="Как к вам обращаться?"
          autoComplete="off"
          {...register("nickName", nicknameFormRules)}
        />
      </div>
      <Button classes="w-full mb-2.5 bg-buttonColor text-xl hover:bg-buttonHover text-buttonTextColor font-semibold px-3 py-5 rounded-2xl min-h-65px">
        Присоединиться к чату
      </Button>
      {errors.nickName && (
        <span className="text-[#ED7138] flex justify-end font-semibold text-xs pl-2 pt-0.5">
          {errors.nickName.message}
        </span>
      )}
    </form>
  );
};

export default NicknameForm;
