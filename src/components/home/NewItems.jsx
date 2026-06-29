import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../api/config";
import Skeleton from "../UI/Skeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const getItemsPerPage = () => {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    setItemsPerPage(getItemsPerPage());
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(API.NEW_ITEMS);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching New Items:", err);
      }
    };
    fetchItems();
  }, []);

  const calculateTimeLeft = (expiryDate) => {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return "Expired";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${h}h ${m}m ${s}s`;
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

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const visibleItems =
    items.length > 0
      ? Array.from({ length: itemsPerPage }, (_, i) => {
          const index = (startIndex + i) % items.length;
          return items[index];
        })
      : [];

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">

        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center position-relative mt-4">

          <button
            onClick={handlePrev}
            className="btn btn-light border rounded-circle shadow-sm me-3"
            style={{ width: 40, height: 40 }}
          >
            <i className="fa fa-angle-left"></i>
          </button>

          <div className="row justify-content-center w-100">

            {items.length === 0 &&
              new Array(itemsPerPage).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
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

            {items.length > 0 &&
              visibleItems.map((item, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`${item.id}-${index}`}>
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {item.expiryDate && (
                      <div className="de_countdown">
                        {timeLeft[item.id] || "Loading..."}
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
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

          <button
            onClick={handleNext}
            className="btn btn-light border rounded-circle shadow-sm ms-3"
            style={{ width: 40, height: 40 }}
          >
            <i className="fa fa-angle-right"></i>
          </button>

        </div>
      </div>
    </section>
  );
};

export default NewItems;
