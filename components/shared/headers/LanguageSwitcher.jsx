import React from "react";
import { i18n } from "next-i18next";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";

function LanguageSwitcher() {
  const router = useRouter();
  const changeLanguage = (lang) => {
    router.push(router.pathname, undefined, { locale: lang });
  };
  return (
    <Dropdown className="Drop">
      <Dropdown.Toggle
        variant=""
        id="dropdown-basic"
        style={{
          color: "black",
          borderColor: "transparent",
          background: "transparent",
        }}
      >
        EN <i className="bi bi-chevron-down "></i>
      </Dropdown.Toggle>

      <Dropdown.Menu align="center" className="Menu">
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("ar")}>
          Arabic
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSwitcher;
