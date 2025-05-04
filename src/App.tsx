import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Portal = lazy(() => import("./pages/Portal"));
const RedLightGreenLight = lazy(() => import("./pages/RedLightGreenLight"));
const Images = lazy(() => import("./pages/Images"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="mt-10 text-center">Loading Page...</div>}>
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/redlightgreenlight" element={<RedLightGreenLight />} />
          <Route path="/images" element={<Images />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
