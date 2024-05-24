import { Link } from "react-router-dom";

export default function PageHeader({
  pageName,
  mainBtnTxt,
  secondaryBtnTxt,
  mainAction,
  secondaryAction,
  moreButtons,
}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Link
          className="text-sm text-blue-500 hover:font-medium duration-[.5]"
          to={"/"}
        >
          Atras
        </Link>
        <h1 className="text-3xl font-medium">{pageName}</h1>
      </div>
      <div className="flex gap-2 my-10">
        <button
          onClick={() => mainAction()}
          className="rounded-md bg-black text-white py-2 px-4 font-medium"
        >
          {mainBtnTxt}
        </button>
        <button
          onClick={() => secondaryAction()}
          className="rounded-md border-2 border-black py-2 px-4 font-medium"
        >
          {secondaryBtnTxt}
        </button>
        {moreButtons &&
          moreButtons?.map((button, idx) => (
            <button
              key={idx}
              onClick={button.action}
              className="rounded-md border-2 border-black py-2 px-4 font-medium"
            >
              {button.text}
            </button>
          ))}
      </div>
    </>
  );
}
