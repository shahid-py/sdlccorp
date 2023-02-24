import { useSelector , useDispatch } from "react-redux";
import { logout } from "../features/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { selectCurrentUser } from "../features/index";

import "../index.css";

export function Navbar() {
  const currentUser = useSelector(selectCurrentUser);



  const navigate = useNavigate();



  const [dialog, setDialog] = useState(false);

  const checkUserStatus = () => {
    currentUser ? setDialog(true) : navigate("/login", { replace: true });
  };

  return (
    <div>
      {dialog && <ShowDialog dialog={dialog} setDialog={setDialog} />}
      <div className="bg-blue-200 w-full py-2 flex  justify-between items-center  dark:bg-gray-800">
        <Link to="/">
        <div className="col-start-3 ml-3 col-end-4 ">
        <img src="/sdlc.png" height={120} width={160}  alt="" />
        </div>
        </Link>

        <div className="  ">
          {/* <Link to="/address" className="link">
            <button className="btn-primary-icon">
              <span className="material-icons-round md-36">person</span>
            </button>
          </Link> */}

         

          
          <button
            className="text-xl font-medium shadow-xl mr-4 "
            onClick={checkUserStatus}
          >
            {currentUser ? "LOGOUT" : "LOGIN"}
          </button>
        </div>
        </div>
    </div>
  );
}

function ShowDialog({ dialog, setDialog }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="dialog-content-container z-2">
        <section className="dialog-content">
          <header className="dialog-header">
            <h3>LOGOUT</h3>
          </header>
          <div className="dialog-body  ">
            <p>Are you sure you want to log out?</p>
          </div>
          <footer className="dialog-footer">
            <button
              className="btn btn-default dialog-alert-noBtn"
              onClick={() => setDialog(false)}
            >
              No
            </button>
            <button
              className="btn btn-primary dialog-alert-yesBtn"
              onClick={() => {
                setDialog(false);
                dispatch(logout());
                navigate("/", { replace: true });
              }}
            >
              Yes
            </button>
          </footer>
        </section>
      </div>
    </>
  );
}