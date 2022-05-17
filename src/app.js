import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.js";
import Work from "./pages/work/work.js";
import Project from "./pages/project/project";
import Layout from "./components/layout/layout.js";
import { AppProvider } from "./appContext";
import { useWindowSize } from "./hooks/useWindowSize.js";
import { createClient } from "contentful";
import ScrollToTop from "./scrollToTop.js";
import About from "./pages/about/about.js";

export default function App() {
  let translations = require("./translations.json");
  const [screenMoved, setScreenMoved] = useState(false);
  const [locale, setLocale] = useState("nl");
  const [translation, setTranslation] = useState(translations["nl"]);
  const size = useWindowSize();

  if (size.width > 830 && screenMoved) {
    setScreenMoved(false);
  }
  useEffect(() => {
    let locale = JSON.parse(localStorage.getItem("locale"))
      ? JSON.parse(localStorage.getItem("locale"))
      : "nl";
    setLocale(locale);
    setTranslation(translations[locale]);
  }, [translations]);

  function changeLocale(locale) {
    localStorage.setItem("locale", JSON.stringify(locale));
    setLocale(locale);
    setTranslation(translations[locale]);
  }

  function moveScreen() {
    setScreenMoved(!screenMoved);
  }

  const contentfulClient = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_API_KEY,
  });

  const appContext = {
    translations: translation,
    locale: locale,
    setLocale: changeLocale,
    moveScreen: moveScreen,
    screenMoved: screenMoved,
    contentfulClient: contentfulClient,
  };
  return (
    <AppProvider value={appContext}>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="project">
              <Route path=":projectSlug" element={<Project />} />
            </Route>
            <Route path="about" element={<About />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
