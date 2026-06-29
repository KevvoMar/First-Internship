import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";
import { API } from "../api/config";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  const fetchAuthor = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API.AUTHOR_DETAIL}${authorId}`);
      setAuthor(res.data);
    } catch (err) {
      console.error("Error fetching author:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  useEffect(() => {
    if (!author?.nftCollection) return;

    const interval = setInterval(() => {
      setBannerIndex((prev) =>
        prev + 1 < author.nftCollection.length ? prev + 1 : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [author]);

  const handleFollow = () => {
    if (!author) return;

    setIsFollowing((prev) => !prev);

    setAuthor((prev) => ({
      ...prev,
      followers: prev.followers + (isFollowing ? -1 : 1),
    }));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: author?.nftCollection
              ? `url(${author.nftCollection[bannerIndex].nftImage}) center/cover`
              : `url(${AuthorBanner}) top`,
            transition: "background-image 1s ease-in-out",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="120px" height="120px" borderRadius="50%" />
                      ) : (
                        <img
                          src={author.authorImage}
                          alt={author.authorName}
                        />
                      )}

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="200px" height="25px" />
                          ) : (
                            <>
                              {author.authorName}
                              <span className="profile_username">@{author.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton width="120px" height="20px" />
                      ) : (
                        <div className="profile_follower">
                          {author.followers} followers
                        </div>
                      )}

                      {loading ? (
                        <Skeleton width="100px" height="40px" borderRadius="8px" />
                      ) : (
                        <button className="btn-main" onClick={handleFollow}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={author?.nftCollection}
                    authorsImage={author?.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;