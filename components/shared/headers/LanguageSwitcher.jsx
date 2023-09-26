import React, { useEffect, useState } from "react";
import { i18n, useTranslation } from "next-i18next";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation();
  const { pathname, query } = router;
  const changeLanguage = (lang) => {
    router.push({ pathname, query }, undefined, { locale: lang });
  };
  const { locale } = router;
  const { theme } = useTheme();
  const [svgStroke, setSvgStroke] = useState("");
  useEffect(() => {
    setSvgStroke(theme === "dark" ? "white" : "black");
  }, [theme]);
  return (
    // <Dropdown className="Drop">
    //   <Dropdown.Toggle
    //     variant=""
    //     id="responsive-dropdown"
    //     style={{
    //       color: svgStroke,
    //       borderColor: "transparent",
    //       background: "transparent",
    //     }}
    //   >
    //     {locale.toUpperCase()} <i className="bi bi-chevron-down "></i>
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu align="center" className="Menu">
    //     <Dropdown.Item onClick={() => changeLanguage("en")}>
    //       English
    //     </Dropdown.Item>
    //     <Dropdown.Item onClick={() => changeLanguage("ar")}>
    //       {t("Arabic")}
    //     </Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="responsive-dropdown"
        style={{
          color: svgStroke,
          borderColor: "transparent",
          background: "transparent",
        }}
      >
        {locale.toUpperCase()} <i className="bi bi-chevron-down "></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("ar")}>
          {t("Arabic")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSwitcher;
