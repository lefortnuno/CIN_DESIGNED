import { BsXLg } from "react-icons/bs";

export default function Header() {

  //#region // RENDU HTML ----
  return (
    <>
      <input type="checkbox" id="checkbox" />
      <header className="header">
        <h2 className="u-name">
          e-<b>CIN</b>
          <label htmlFor="checkbox">
            <span id="navbtn">
              <BsXLg />
            </span>
          </label>
        </h2>
        <i className="fa fa-user" aria-hidden="true"></i>
      </header>
    </>
  );
  //#endregion
}
