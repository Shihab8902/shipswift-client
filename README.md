# ShipSwift
### Live Site: https://shipswiftbyshihab.netlify.app
### Server Side: https://github.com/Shihab8902/shipswift-server

----
ShipSwift is a parcel management app where user can book a parcel for deliver, admin can assign a delivery man and delivery man deliver the parcel.

## Table of contents
1. [Modern and easy to navigate UI](#modern-and-easy-to-navigate-ui)

2. [Secure registration and login system](#secure-registration-and-login-system)
3. [User specific dashboard control](#user-specific-dashboard-control)
4. [App usage stats](#app-usage-stats)
5. [Back-end token verification](#back-end-token-verification)



---

 - ## Modern and easy to navigate UI
We are using react alongside with tailwind to create a modern and easy to navigate user experience. We are using react router to navigate through different routes faster we are also using deeper color theme that is pleasing to eyes.

---

- ## Secure registration and login system
We are using firebase to create a secure login and registration system. User can register their profile using email and password. There is also a Google based login system for social login. User can access website's protected routes by login and specific defined role.

---

- ## User specific dashboard control
There is a dashboard system for all three types of user (user, delivery man and admin). User can access their specific dashboard control routes by their defined role. Trying to access admin role for general user is highly prohibited and handled using backend.

---

- ## App usage stats
Admin has a route called stats in admin dashboard control. Use can monitor the website performance from there. There is a bar chart representing the total parcels that were booked by the users in a specific date. There is also a line chart to monitor parcel booking and delivery comparison. There is also a count for some stats in the home page.

---
 - ## Back-end token verification 
 We are using json web token to create a token system in our website. The token alongside with axios interceptors help controlling unauthentic and unauthorized users to using forbidden website features.


 ---

 There is several other features throughout the website. This website will provide a complete solution for parcel delivery management.


