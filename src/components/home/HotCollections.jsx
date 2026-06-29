import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../api/config";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${API.HOT_COLLECTIONS}/collections`);
        setCollections(res.data);
      } catch (err) {
        console.error("Error fetching Hot Collections:", err);
      }
    };
    fetchCollections();
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % collections.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  const visibleItems =
    collections.length > 0
      ? Array.from({ length: itemsPerPage }, (_, i) => {
          const index = (startIndex + i) % collections.length;
          return collections[index];
        })
      : [];

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">

        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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

            {collections.length === 0 &&
              new Array(itemsPerPage).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" borderRadius="10px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="40px" height="40px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="70%" height="20px" borderRadius="4px" />
                      <Skeleton width="40%" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))}

            {collections.length > 0 &&
              visibleItems.map((item, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`${item.nftId}-${index}`}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy pp-coll" src={item.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
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

export default HotCollections;
