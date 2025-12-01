import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import SymptomChecker from './components/SymptomChecker'
import DoctorFinder from './components/DoctorFinder'
import EmergencyService from './components/EmergencyService'
import HealthRecords from './pages/HealthRecords'
import Telemedicine from './pages/Telemedicine'
import HelpCenter from './pages/HelpCenter'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import FAQ from './pages/FAQ'
import AboutUs from './pages/AboutUs'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import HealthCheckup from './components/HealthCheckup'
import MedicineStore from './components/MedicineStore'
import OrderStatus from './pages/OrderStatus'
import Settings from './pages/Settings'
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Appointments from './pages/Appointments'
import HealthCheckupBookings from './pages/HealthCheckupBookings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/health-checkup-bookings" element={<HealthCheckupBookings />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/doctors" element={<DoctorFinder />} />
              <Route path="/emergency" element={<EmergencyService />} />
              <Route path="/health-checkup" element={<HealthCheckup />} />
              <Route path="/medicines" element={<MedicineStore />} />
              <Route path="/telemedicine" element={<Telemedicine />} />
              <Route path="/health-records" element={<ProtectedRoute><HealthRecords /></ProtectedRoute>} />
              <Route path="/order-status" element={<OrderStatus />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App