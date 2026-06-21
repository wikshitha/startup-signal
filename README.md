# 🚀 StartupSignal

**AI-Powered Startup Idea Validation Platform**

StartupSignal is a modern web application that helps entrepreneurs validate their startup ideas using advanced AI analysis. The platform provides comprehensive validation reports with market demand analysis, competition assessment, revenue potential evaluation, and personalized recommendations.

---

## 🌟 Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt encryption
- **Idea Submission**: Submit startup ideas with problem statements, solutions, and target user descriptions
- **AI-Powered Validation**: Advanced analysis using OpenAI/Google Generative AI integration
- **Comprehensive Reports**: Detailed validation reports including:
  - Validation Score (0-100)
  - Market Demand Assessment
  - Competition Level Analysis
  - Revenue Potential Evaluation
  - Risk Level Assessment with specific risks
  - MVP (Minimum Viable Product) Features recommendation
  - Strategic Recommendations
- **Dashboard**: Personalized user dashboard to manage ideas and view reports
- **Report History**: Track all validation reports for each startup idea
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org) 16.2.9
- **Language**: TypeScript
- **UI Framework**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

### Database
- **Database**: PostgreSQL
- **ORM**: Prisma 7.8.0
- **Adapter**: Prisma PostgreSQL Adapter

### AI Integration
- **OpenAI**: OpenAI API 6.44.0
- **Google Generative AI**: @google/generative-ai 0.24.1

### Development Tools
- **Linting**: ESLint 9
- **HTTP Client**: Axios 1.18.0
- **Database Client**: pg 8.22.0

---

## 📋 Project Structure

```
startup-signal/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts          # Login endpoint
│   │   │   └── register/route.ts       # Registration endpoint
│   │   ├── me/route.ts                 # Get user profile
│   │   ├── reports/
│   │   │   └── my/route.ts             # Get user's validation reports
│   │   └── validate/route.ts           # AI validation endpoint
│   ├── dashboard/page.tsx              # User dashboard
│   ├── login/page.tsx                  # Login page
│   ├── register/page.tsx               # Registration page
│   ├── reports/page.tsx                # Reports listing page
│   ├── validate/page.tsx               # Idea validation form
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Landing page
│   ├── providers.tsx                   # Context providers
│   └── globals.css                     # Global styles
├── lib/
│   ├── jwt.ts                          # JWT utilities
│   ├── openrouter.ts                   # AI integration utilities
│   └── prisma.ts                       # Prisma client
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── migrations/                     # Database migrations
├── public/                             # Static assets
├── next.config.ts                      # Next.js configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Project dependencies
├── eslint.config.mjs                   # ESLint configuration
└── postcss.config.mjs                  # PostCSS configuration
```

---

## 🗄️ Database Schema

### User Model
- `id`: Unique identifier (CUID)
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `ideas`: Relation to StartupIdea
- `createdAt`, `updatedAt`: Timestamps

### StartupIdea Model
- `id`: Unique identifier (CUID)
- `title`: Idea title
- `problem`: Problem statement
- `solution`: Solution description
- `targetUsers`: Target user description
- `userId`: Reference to User
- `report`: Relation to ValidationReport
- `createdAt`, `updatedAt`: Timestamps

### ValidationReport Model
- `id`: Unique identifier (CUID)
- `score`: Validation score (0-100)
- `marketDemand`: Market demand assessment
- `competitionLevel`: Competition analysis
- `revenuePotential`: Revenue potential evaluation
- `riskLevel`: Risk assessment level
- `risks`: JSON array of specific risks
- `mvpFeatures`: JSON array of MVP features
- `recommendation`: Strategic recommendations
- `rawReport`: Full AI-generated report
- `startupIdeaId`: Reference to StartupIdea
- `createdAt`, `updatedAt`: Timestamps

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- OpenAI API key or Google Generative AI key
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/startup-signal.git
   cd startup-signal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/startup_signal"
   
   # JWT
   JWT_SECRET="your-secret-key-here"
   
   # AI Integration
   OPENAI_API_KEY="your-openai-api-key"
   # OR
   GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-api-key"
   
   # Next.js
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### User Registration
1. Visit the homepage and click "Register"
2. Enter your name, email, and password
3. Submit the form to create an account

### User Login
1. Click "Login" on the homepage
2. Enter your credentials
3. Access your personalized dashboard

### Validate a Startup Idea
1. Navigate to the "Validate" section
2. Fill in the form with:
   - **Title**: Your startup idea title
   - **Problem**: The problem your startup solves
   - **Solution**: Your proposed solution
   - **Target Users**: Your target audience
3. Submit the form
4. AI analysis generates a comprehensive report
5. View your validation report with detailed insights

### View Reports
1. Go to the "Reports" section
2. Browse all validation reports for your ideas
3. Review scores, insights, and recommendations

---

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:
- Passwords are hashed using **bcryptjs** with 10 salt rounds
- JWTs are issued upon successful login
- Tokens are stored securely in localStorage
- Protected routes verify JWT validity
- Automatic token expiration and refresh mechanisms

---

## 🤖 AI Integration

The platform leverages advanced AI models for idea validation:
- **Analysis Depth**: Comprehensive evaluation across multiple dimensions
- **Scoring Algorithm**: Data-driven scoring from 0-100
- **Risk Assessment**: Identifies potential challenges and mitigation strategies
- **MVP Planning**: Generates practical MVP feature recommendations
- **Personalized Insights**: Tailored recommendations based on idea specifics

---

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/me` - Get current user profile

### Validation
- `POST /api/validate` - Validate startup idea (requires auth)

### Reports
- `GET /api/reports/my` - Get user's validation reports (requires auth)

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env.local
- Ensure database exists and user has permissions
- Run migrations: `npx prisma migrate dev`

### AI Integration Errors
- Verify API keys are correct
- Check API quotas and usage limits
- Ensure network connectivity
- Review API documentation for rate limits

### Authentication Issues
- Clear browser cookies and localStorage
- Verify JWT_SECRET is set
- Check token expiration
- Re-login to refresh token

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Prisma](https://www.prisma.io) - Database ORM
- [OpenAI](https://openai.com) & [Google Generative AI](https://ai.google.dev) - AI services
- All contributors and users

---

## 📅 Version

**Current Version**: 0.1.0

---

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

