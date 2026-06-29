import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../api/config";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [collections, setCollections] = useState([]);

  const visibleItems =
    collections.length >= 4
      ? [
        collections[startIndex],
        collections[(startIndex + 1) % collections.length],
        collections[(startIndex + 2) % collections.length],
        collections[(startIndex + 3) % collections.length],
      ]
      : [];

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

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-in">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        <div className="position-relative mt-4" data-aos="fade-up" data-aos-delay="150">

          {/* LEFT ARROW */}
          <button
            onClick={handlePrev}
            className="position-absolute start-0 top-50 translate-middle-y 
                       btn btn-light border rounded-circle shadow-sm"
            style={{ width: "40px", height: "40px", zIndex: 10 }}
            data-aos="zoom-in"
          >
            <i className="fa fa-angle-left"></i>
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={handleNext}
            className="position-absolute end-0 top-50 translate-middle-y 
                       btn btn-light border rounded-circle shadow-sm"
            style={{ width: "40px", height: "40px", zIndex: 10 }}
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <i className="fa fa-angle-right"></i>
          </button>

          <div className="row mt-4">
            {collections.length === 0
              ? new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" borderRadius="10px" />
                    </div>

                    <div className="nft_coll_pp d-flex align-items-center gap-2 mt-3">
                      <Skeleton width="40px" height="40px" borderRadius="50%" />
                      <Skeleton width="20px" height="20px" borderRadius="4px" />
                    </div>

                    <div className="nft_coll_info mt-2">
                      <Skeleton width="70%" height="20px" borderRadius="4px" />
                      <Skeleton width="40%" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))
              : visibleItems.map((item, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
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

        </div>
      </div>
    </section>
  );
};

export default HotCollections;
