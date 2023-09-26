import React, { useEffect, useState } from "react";
import { i18n, useTranslation } from "next-i18next";
// import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Dropdown, Button, Menu } from "antd";
function LanguageSwitcherMobile() {
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

  const items = [
    {
      label: <a onClick={() => changeLanguage("en")}>English</a>,
    },
    {
      label: <a onClick={() => changeLanguage("ar")}>{t("Arabic")}</a>,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <span
        style={{
          color: svgStroke,
          borderColor: "transparent",
          background: "transparent",
        }}
      >
        {locale.toUpperCase()} <i className="bi bi-chevron-down "></i>
      </span>
    </Dropdown>
  );
}

export default LanguageSwitcherMobile;
