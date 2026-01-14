# MicroEarn - Distributed Micro-Tasking Platform

MicroEarn is a robust micro-tasking and earning platform that connects Buyers (task creators) with Workers (task performers). Buyers can post simple online tasks, and Workers can earn coins by completing them. The platform features a secure payment system, role-based dashboards, and a coin-based economy.

## 🚀 Live Site
**URL:** [https://micro-earn-demo.web.app](https://micro-task-870de.web.app/)

## 🔑 Admin Credentials
*   **Email:** `chysaifurrahmanbd@gmail.com`
*   **Password:** `Phb12a13`

## ✨ Key Features (10+)

1.  **Role-Based Access Control (RBAC):** Distinct dashboards and functionalities for Workers, Buyers, and Admins.
2.  **Secure Authentication:** Powered by Firebase (Email/Password & Google Sign-In) with JWT validation for API security.
3.  **Coin Economy System:** Workers earn coins for tasks; Buyers purchase coins via Stripe to post tasks. 1000 Coins = $1 USD.
4.  **Task Management Lifecycle:** Buyers post tasks, Workers submit proofs, Buyers review (Approve/Reject), and Admins oversee all.
5.  **Payment Integration:** Integrated **Stripe Payment Gateway** for seamless coin purchasing by Buyers.
6.  **Withdrawal System:** Workers can withdraw their earnings (coins converted to $) via multiple payment methods once they reach the threshold.
7.  **Automated Email Notifications:** Users receive emails for critical actions like task approval, rejection, and withdrawal confirmation using **Nodemailer**.
8.  **Dark Mode:** Fully responsive dark/light mode toggle with persistent theme preference.
9.  **Real-time Stats:** Interactive dashboards showing earnings, pending tasks, and submission statuses.
10. **Image Upload Integration:** Seamless image hosting using **ImgBB API** for profile pictures and task proofs.
11. **Responsive Design:** Optimized for Mobile, Tablet, and Desktop using Tailwind CSS.
12. **Secure Admin Controls:** Admins can manage users, delete tasks, and process withdrawal requests.

## 🛠️ Technology Stack
*   **Frontend:** React, Tailwind CSS, DaisyUI, TanStack Query, Axios, SweetAlert2, Framer Motion.
*   **Backend:** Node.js, Express.js, MongoDB (Native Driver), JWT.
*   **Services:** Firebase Auth, Stripe, ImgBB, Nodemailer.

## 🔧 Installation & Run

1.  Clone the repo.
2.  Install dependencies: `npm install`
3.  Set up `.env` with Firebase and backend keys.
4.  Run: `npm run dev`
