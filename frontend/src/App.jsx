import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientList from './pages/clients/clientList';
import ClientForm from './pages/clients/clientForm';
import ClientDetail from './pages/clients/clientDetail';
import DashboardLayout from './components/dashboardLayout/dashboardLayout';
import DashboardHome from './pages/dashboard/dashboardHome';
import AllNotes from './pages/notes/allNotes';
import NoteForm from './pages/notes/noteForm';
import MeetingList from './pages/meetings/meetingList';
import MeetingForm from './pages/meetings/meetingForm';
import MeetingDetail from './pages/meetings/meetingDetail';
import MeetingsOfTheDay from './pages/meetings/meetingsOfTheDay';
import Login from './pages/user/login';
import Register from './pages/user/register';
import { NoteProvider } from './contexts/noteContext';
import { ClientProvider } from './contexts/clientContext';
import PrivateRoute from './utils/privateRoute';

function App() {
  return (
    <ClientProvider>
      <NoteProvider>
        <Router>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* Private Route */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/clients" element={<ClientList />} />
                <Route path="/clients/new" element={<ClientForm />} />
                <Route path="/clients/edit/:id" element={<ClientForm />} />
                <Route path="/clients/:id" element={<ClientDetail />} />

                <Route path="/notes" element={<AllNotes />} />
                <Route path="/notes/new" element={<NoteForm />} />
                <Route path="/notes/edit/:id" element={<NoteForm />} />

                <Route path="/meetings" element={<MeetingList />} />
                <Route path="/meetings/new" element={<MeetingForm />} />
                <Route path="/meetings/edit/:id" element={<MeetingForm />} />
                <Route path="/meetings/:id" element={<MeetingDetail />} />
                <Route path="/calendar/day/:date" element={<MeetingsOfTheDay />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </NoteProvider>
    </ClientProvider >
  );
}

export default App;
