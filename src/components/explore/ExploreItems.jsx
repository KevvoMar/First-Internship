import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";
import { API } from "../../api/config";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");

  const fetchItems = async (filter = "") => {
    setLoading(true);

    try {
      const url = filter
        ? `${API.EXPLORE_ITEMS}?filter=${filter}`
        : API.EXPLORE_ITEMS;

      const res = await axios.get(url);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching Explore Items:", err);
    } finally {
      setLoading(false);
      setVisibleCount(8);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSort = (value) => {
    setSortOption(value);
    fetchItems(value);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {(loading ? new Array(8).fill(0) : items.slice(0, visibleCount)).map(
        (item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">

              <div className="author_list_pp">
                {loading ? (
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                ) : (
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
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
                      <Link to="#" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </Link>
                      <Link to="#" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </Link>
                      <Link to="#">
                        <i className="fa fa-envelope fa-lg"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <Skeleton width="100%" height="250px" borderRadius="10px" />
                ) : (
                  <Link to={`/item-details/${item.id}`}>
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
                    <Link to={`/item-details/${item.id}`}>
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

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
