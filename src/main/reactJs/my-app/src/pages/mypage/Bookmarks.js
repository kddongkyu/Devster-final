import React, { useEffect, useState } from "react";
import "./style/Bookmarks.css";
import axiosIns from "../../api/JwtConfig";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function Bookmarks(props) {
  const decodedToken = checkToken();
  const m_idx = decodedToken.idx;
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axiosIns.get(`/bookmarks/${m_idx}`);
        //console.log(response.data);
        setBookmark(response.data);
      } catch (e) {
        jwtHandleError(e, toastAlert);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div
      className="bookmarks"
      // style={{ height: bookmark.length === 0 ? "60rem" : "90rem" }}
    >
      <div className="content-bookmarks">
        <b className="text-bookmark">채용정보 북마크</b>
        <div
          className="content-bookmarks1"
          style={{ display: bookmark.length === 0 ? "block" : "grid" }}
        >
          {bookmark.length === 0 ? (
            <div className="bookmark-01" style={{ width: "100%" }}>
              북마크한 채용정보가 없습니다
            </div>
          ) : (
            bookmark.map((item, idx) => (
              <div
                className={`bookmark-0${idx + 1}`}
                key={idx}
                style={{ width: "100%" }}
              >
                <div>
                  <div className="bookmark-image-01" />
                  <div className="text-bookmark-01">{item.hb_subject}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
