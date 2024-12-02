import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../Styles/OffersContent.css"

const OffersList = ({ offers = [], onStatusToggle , onDeleteOffer }) => {
  if (offers.length === 0) {
    return <p>No offers available.</p>;
  }

  return (
    <List className="offers-list">
      {offers.map((offer) => (
        <ListItem
          key={offer.tier_id}
          component={RouterLink}
          button={true}
          className={`offer-item ${offer.status ? "active" : "inactive"}`}
        >
          <div className="offer-image">
            {offer.image && (
              <div className="offer-image">
                <img
                  src={`data:image/${offer.image.type};base64,${offer.image.base64}`}
                  alt={offer.offerTitle}
                />
              </div>
            )}
          </div>
          <ListItemIcon>{/* Icon can be placed here */}</ListItemIcon>
          <ListItemText
            primary={offer.offerTitle}
            secondary={
              <>
                <p className="offer-description">{offer.offerDescription}</p>
                <p className="offer-benefit">Benefit: {offer.benefit}%</p>
              </>
            }
          />
          <div className="offer-status">
            <button
              className="status-toggle"
              onClick={(e) => {
                e.stopPropagation();
                onStatusToggle(offer.tier_id);
              }}
            >
              {offer.status ? "Active" : "Inactive"}
            </button>
          </div>
          <div className="offer-actions">
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteOffer(offer.tier_id);
              }}
            >
              Delete
            </button>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default OffersList;
