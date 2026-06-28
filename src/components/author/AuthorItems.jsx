import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";

const AuthorItems = ({ nftCollection }) => {
  const loading = !nftCollection;
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {(loading ? new Array(8).fill(0) : nftCollection.slice(0, visibleCount)).map(
            (item, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">

                  <div className="author_list_pp">
                    {loading ? (
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    ) : (
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    )}
                  </div>

                  {loading ? (
                    <div className="de_countdown">
                      <Skeleton width="100px" height="20px" />
                    </div>
                  ) : (
                    item.expiryDate && (
                      <div className="de_countdown">
                        <CountdownTimer expiryDate={item.expiryDate} />
                      </div>
                    )
                  )}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    {loading ? (
                      <Skeleton width="100%" height="250px" borderRadius="10px" />
                    ) : (
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    )}
                  </div>

                  <div className="nft__item_info">
                    {loading ? (
                      <>
                        <Skeleton width="120px" height="20px" />
                        <Skeleton width="60px" height="18px" />
                      </>
                    ) : (
                      <>
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>

                        <div className="nft__item_price">{item.price} ETH</div>

                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {!loading && nftCollection.length > visibleCount && (
          <div className="col-md-12 text-center mt-4">
            <button className="btn-main" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorItems;
