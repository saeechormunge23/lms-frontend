import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import FormikForm from "./FormicForm";
import OffersList from "./OffersList";
import { Link } from "react-router-dom";
import "../Styles/OffersContent.css";

const OffersContent = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingOffers = localStorage.getItem("offers");
    if (existingOffers) {
      setOffers(JSON.parse(existingOffers));
    }
    setLoading(false);
  }, []);

  const handleStatusToggle = (offerId) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.tier_id === offerId) {
        return { ...offer, status: !offer.status };
      }
      return offer;
    });
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
  };

  const handleDeleteOffer = (offerId) => {
    const updatedOffers = offers.filter((offer) => offer.tier_id !== offerId);
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="offers-content">
      <h2>Your Offers</h2>
      <Link to="/offers/add" className="add-offer-btn">
        Add Offer
      </Link>
      <OffersList
        offers={offers}
        onStatusToggle={handleStatusToggle}
        onDeleteOffer={handleDeleteOffer}
      />
    </div>
  );
};

export default OffersContent;
