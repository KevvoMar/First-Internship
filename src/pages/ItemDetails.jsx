import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";
import { API } from "../api/config";

const ItemDetails = () => {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchItemDetails = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API.ITEM_DETAILS}${itemId}`);
      setItem(res.data);
    } catch (err) {
      console.error("Error fetching item details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, [itemId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">

              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="400px" borderRadius="10px" />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="item_info">

                  {loading ? (
                    <Skeleton width="250px" height="30px" />
                  ) : (
                    <h2>{item.title}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width="30px" /> : item.views || 100}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width="30px" /> : item.likes || 74}
                    </div>
                  </div>

                  {loading ? (
                    <Skeleton width="100%" height="80px" />
                  ) : (
                    <p>{item.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt={item.ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>

                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="120px" height="20px" />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt={item.creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>

                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="120px" height="20px" />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (
                        <Skeleton width="50px" height="20px" />
                      ) : (
                        <span>{item.price || "0.00"}</span>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ItemDetails;
