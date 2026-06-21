import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { API } from "../../api/config";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [startIndex, setStartIndex] = useState(0);

  const visibleItems =
    items.length >= 4
      ? [
          items[startIndex],
          items[(startIndex + 1) % items.length],
          items[(startIndex + 2) % items.length],
          items[(startIndex + 3) % items.length],
        ]
      : [];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const calculateTimeLeft = (expiryDate) => {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      items.forEach((item) => {
        updated[item.id] = calculateTimeLeft(item.expiryDate);
      });
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const res = await axios.get(API.NEW_ITEMS);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching New Items:", err);
      }
    };

    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">

        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        <div className="position-relative mt-4">

          {items.length > 4 && (
            <>
              <button
                onClick={handlePrev}
                className="position-absolute start-0 top-50 translate-middle-y 
                           btn btn-light border rounded-circle shadow-sm"
                style={{ width: "40px", height: "40px", zIndex: 10 }}
              >
                <i className="fa fa-angle-left"></i>
              </button>

              <button
                onClick={handleNext}
                className="position-absolute end-0 top-50 translate-middle-y 
                           btn btn-light border rounded-circle shadow-sm"
                style={{ width: "40px", height: "40px", zIndex: 10 }}
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </>
          )}

          <div className="row mt-4">

            {/* SKELETONS */}
            {items.length === 0 &&
              new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>

                    <div className="de_countdown mt-2">
                      <Skeleton width="80px" height="16px" borderRadius="4px" />
                    </div>

                    <div className="nft__item_wrap mt-3">
                      <Skeleton width="100%" height="200px" borderRadius="10px" />
                    </div>

                    <div className="nft__item_info mt-3">
                      <Skeleton width="70%" height="20px" borderRadius="4px" />
                      <Skeleton width="40%" height="16px" borderRadius="4px" className="mt-2" />

                      <div className="nft__item_like mt-3">
                        <Skeleton width="30px" height="16px" borderRadius="4px" />
                      </div>
                    </div>

                  </div>
                </div>
              ))}

            {/* REAL ITEMS */}
            {items.length > 0 &&
              visibleItems.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={item.id}>
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {item.expiryDate && (
                      <div className="de_countdown">
                        {timeLeft[item.id] || "Loading..."}
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>

                      <div className="nft__item_price">{item.price} ETH</div>

                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
