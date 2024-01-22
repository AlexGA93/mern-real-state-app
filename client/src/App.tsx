import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, About, Profile, CreateListing } from "./pages";
import { Header, PrivateRoute } from "./components";
import { ROUTES } from "./utils/constants";

export default function App() {
  return (
    <BrowserRouter>
      {/* Common component ath the entire site - Header */}
      <Header />
      <Routes>
        <Route path={ROUTES.ROOT} element={<Home />} />
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.CREATE_LISTING} element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
