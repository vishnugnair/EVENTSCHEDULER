import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import NotFound from "./pages/NotFound"; // Import the NotFound component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Home />} />
        <Route path="/events/:userId" element={<EventsPage />} />

        {/* Catch-all route for non-existing routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
