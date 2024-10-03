import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import TutorLayout from "./components/TutorLayout.jsx";
import Forms from "./pages/Forms.jsx";
import Dashboard from "./pages/student/Dashboard.jsx";
import TutorDashboard from "./pages/tutor/TutorDashboard.jsx";
import ContentUpload from "./pages/tutor/ContentUpload.jsx";
import NoPage from "./pages/NoPage.jsx";
import Library from "./pages/student/Library.jsx";
import ContentSharing from "./pages/student/ContentSharing.jsx";
import Contact from "./pages/student/Contact.jsx";
import AiPlayground from "./pages/student/AiPlayground.jsx";
import ClassSession from "./pages/student/ClassSession.jsx";
import LiveClassSession from "./pages/student/LiveClassSession.jsx";
import CourseDash from "./pages/student/CourseDash.jsx";
import ExamList from "./pages/student/ExamList.jsx";
import TutorForms from "./pages/TutorForms.jsx";
import AlertsAndExams from "./pages/tutor/AlertsAndExams.jsx";
import NewClass from "./pages/tutor/NewClass.jsx";
import NewLiveClassSession from "./pages/tutor/NewLiveClassSession.jsx";
import P2P from "./pages/P2P.jsx";
import Dash from "./pages/student/Dash.jsx";
import Summ from "./pages/student/Summ.jsx";
import Search from "./pages/student/Search.jsx";
import Settings from "./pages/student/Settings.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/auth" element={<Forms />} />
        <Route path="/auth/tut" element={<TutorForms />} />

        {/* Student routes */}
        <Route path="/student" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/library" element={<Library />} />

          {/*  */}
          <Route path="/student/map" element={<P2P />} />
          <Route path="/student/transit" element={<Dash />} />
          <Route path="/student/alltransit" element={<Summ />} />
          <Route path="/student/search" element={<Search />} />
          <Route path="/student/settings" element={<Settings />} />
          {/*  */}
          {/*  */}
          <Route path="/student/content-sharing" element={<ContentSharing />} />
          <Route path="/student/coursedash" element={<CourseDash />} />
          <Route path="/student/class" element={<ClassSession />} />
          <Route path="/student/liveclass" element={<LiveClassSession />} />
          <Route path="/student/contact" element={<Contact />} />
          <Route path="/student/ai" element={<AiPlayground />} />
          <Route path="/student/exam" element={<ExamList />} />
          <Route path="*" element={<NoPage />} />
        </Route>

        {/* tutors routes */}
        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<TutorDashboard />} />
          <Route path="/tutor/dashboard" element={<TutorDashboard />} />
          <Route path="/tutor/contentupload" element={<ContentUpload />} />
          <Route path="/tutor/announcements" element={<AlertsAndExams />} />
          <Route path="/tutor/class" element={<NewClass />} />
          <Route path="/tutor/live-session" element={<NewLiveClassSession />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
