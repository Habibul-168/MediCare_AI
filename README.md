# Medical AI Platform

A comprehensive AI-powered healthcare platform that provides symptom analysis, prescription recommendations, doctor connections, and emergency services.

## Features

- **AI Symptom Checker**: Analyze symptoms and get AI-powered medical insights
- **Prescription Generator**: Get medication recommendations based on symptoms
- **Doctor Finder**: Find and connect with qualified healthcare professionals
- **Emergency Services**: 24/7 ambulance dispatch and emergency hospital finder
- **3D Medical Visualizations**: Interactive 3D medical models using Three.js
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Three.js & React Three Fiber for 3D graphics
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- RESTful API architecture
- CORS enabled for cross-origin requests
- JWT for authentication (ready for implementation)

## Project Structure

```
medical-ai-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MedicalScene.jsx
│   │   │   ├── SymptomChecker.jsx
│   │   │   ├── DoctorFinder.jsx
│   │   │   ├── EmergencyService.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
├── backend/
│   ├── models/
│   │   ├── Doctor.js
│   │   ├── Symptom.js
│   │   └── Prescription.js
│   ├── routes/
│   │   ├── symptoms.js
│   │   ├── doctors.js
│   │   ├── emergency.js
│   │   └── prescriptions.js
│   ├── data/
│   │   └── seedData.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical-ai-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to Render or other platforms.

## API Endpoints

### Symptoms
- `POST /api/symptoms/analyze` - Analyze symptoms and generate prescription
- `GET /api/symptoms` - Get all symptoms

### Doctors
- `GET /api/doctors` - Get all doctors (with filtering)
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors/search` - Search doctors by location and specialty
- `POST /api/doctors/:id/book` - Book appointment with doctor

### Emergency
- `GET /api/emergency/hospitals` - Get nearby hospitals
- `POST /api/emergency/ambulance` - Request ambulance dispatch
- `GET /api/emergency/contacts` - Get emergency contact numbers
- `GET /api/emergency/tips/:type` - Get emergency tips by type

### Prescriptions
- `GET /api/prescriptions/:id` - Get prescription by ID
- `GET /api/prescriptions` - Get all prescriptions

## Key Features Explained

### AI Symptom Analysis
The platform uses a comprehensive symptom database to analyze user input and provide:
- Possible medical conditions with confidence scores
- Medication recommendations with dosages
- Precautions and care instructions
- Follow-up recommendations

### Doctor Network
- Search doctors by specialty and location
- View ratings, experience, and availability
- Book appointments directly through the platform
- Contact information and hospital affiliations

### Emergency Services
- 24/7 ambulance dispatch system
- Nearby hospital finder with real-time information
- Emergency contact numbers
- First aid tips for various emergency situations

### 3D Medical Visualizations
Interactive 3D medical models and animations to enhance user experience and medical education.

## Medical Disclaimer

**Important**: This platform provides AI-powered health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions. In case of emergency, call 911 immediately.

## Development

### Adding New Symptoms
Add new symptoms to the symptom database in `backend/routes/symptoms.js`:

```javascript
const symptomDatabase = {
  'new_symptom': {
    conditions: [
      { name: 'Condition Name', probability: 70, severity: 'mild' }
    ],
    medications: [
      { name: 'Medicine Name', dosage: '500mg', frequency: 'Every 6 hours' }
    ]
  }
}
```

### Adding New Doctors
Use the seed script or add directly through the API:

```javascript
{
  name: "Dr. Name",
  specialty: "Specialty",
  experience: 10,
  rating: 4.5,
  location: { city: "City", state: "State" },
  consultationFee: 75,
  isAvailable: true
}
```

### Customizing Styles
- Edit `frontend/tailwind.config.js` for theme customization
- Modify `frontend/src/index.css` for global styles
- Update color schemes in the Tailwind config

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support and questions:
- Email: support@medicareai.com
- Emergency: 911
- Technical Support: Create an issue in the repository