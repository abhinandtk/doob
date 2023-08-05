import React from "react";
import { i18n } from "next-i18next";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";

function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, query } = router;
  const changeLanguage = (lang) => {
    router.push({ pathname, query }, undefined, { locale: lang });
  };
  const { locale } = router;
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
        {locale.toUpperCase()} <i className="bi bi-chevron-down "></i>
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
