import React, { useEffect, useState } from "react";
import "./style/Bookmarks.css";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";

function Bookmarks(props) {
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const decodedToken = jwt_decode(localStorage.accessToken);
      const m_idx = decodedToken.idx;

      try {
        const response = await axiosIns.get(`/bookmarks/${m_idx}`);
        //console.log(response.data);
        setBookmark(response.data);
      } catch (error) {
        console.error("Failed to fetch bookmarks: ", error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bookmarks">
      <div className="content-bookmarks">
        <div className="content-bookmarks1">
          <b className="text-bookmark">채용정보 북마크</b>

          {bookmark.length === 0 ? (
            <div className="bookmark-01">북마크한 채용정보가 없습니다</div>
          ) : (
            bookmark.map((item, idx) => (
              <div className={`bookmark-0${idx + 1}`} key={idx}>
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
