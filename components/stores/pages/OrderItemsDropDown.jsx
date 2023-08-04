import React from "react";
import { useTranslation } from "next-i18next";
function OrderItemsDropDown() {
  const { t } = useTranslation();
  return (
    <div
      className="  mx-auto d-flex justify-content-between align-items-center"
      style={{ width: "90%" }}
    >
      <div class="item_clearfix">
        <img
          src="../images/store/male-soccer-football-player-training-action-isolated-gradient-studio-neon-light copy.jpg"
          className="pictures"
        ></img>
        <div className="shop-content">
          <div class="shopping-card__details">
            <div class="shopping-card__title">
              Strat with Tremolo HSS Laurel Keyboard Brown Sunburst Electric
              Guitar
            </div>
            <div class="shopping-card__options">
              <div>
                <small class="option__key">{t("Quantity")}: </small>
                <small class="option__value">Brown</small>
              </div>
              <div>
                <small class="option__key">{t("Size")}: </small>
                <small class="option__value">34</small>
              </div>
            </div>
            <div class="shopping-card__options">
              <div>
                <small class="option__key">Color: </small>
                <small class="option__value">British Dark Brown</small>
              </div>
              <div>
                <small class="option__key">SKU: </small>
                <small class="option__value">PDT-23000-34000</small>
              </div>
            </div>
            <div class="shopping-card__options">
              <div>
                <small class="option__key">{t("Price")}: </small>
                <small class="option__value">13.000.000 KD </small>
              </div>
              <div>
                <small class="option__value ">34000 KD</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItemsDropDown;
