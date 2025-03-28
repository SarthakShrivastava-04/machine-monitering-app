# MechTrack - Industrial Machine Monitoring

## Introduction
MechTrack is a modern dashboard for monitoring industrial machinery. Track equipment status, temperature, and energy consumption in real-time with an intuitive interface.

## 🚀 Tech Stack

**Frontend**  
▸ Next.js   
▸ TypeScript  
▸ Tailwind CSS  
▸ Zustand
▸ shadcn-ui


**Backend**  
▸ NestJS  
▸ MongoDB (with Prisma)  
▸ JWT Authentication


## 🛠️ Setup Guide

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas URI)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/mechtrack.git
cd mechtrack
pnpm install
```

### 2. Database Setup
#### Local MongoDB:
```bash
# Using Docker (recommended):
docker run --name mechtrack-db -p 27017:27017 -d mongo:6
```
Or install MongoDB locally.

#### MongoDB Atlas:
- Create a free cluster at MongoDB Atlas.
- Whitelist your IP (or use `0.0.0.0/0` for development).
- Get the connection URI.

### 3. Configure Environment
#### Backend (`backend/.env`):
```env
DATABASE_URL="mongodb://localhost:27017/mechtrack"
JWT_SECRET="your-secret-key-here"
```

#### Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 4. Run Prisma Migrations
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 5. Start Servers
Run the following in separate terminals:

#### Backend:
```bash
cd backend
npm run start:dev
```

#### Frontend:
```bash
cd ../frontend
npm run dev
```

