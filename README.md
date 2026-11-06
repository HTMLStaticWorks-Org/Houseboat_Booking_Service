# Lagoon & Leaf — Houseboat Booking Service

A responsive, static HTML/CSS/JavaScript concept website for a serene Kerala houseboat booking service.

## Pages
- `index.html` (and `Home1.html`) — primary scenic landing page
- `Home2.html` — alternate editorial/discovery homepage
- `boats.html` — boats and package cards
- `gallery.html` — image gallery
- `contact.html` — booking enquiry form
- `login.html` — sign-in page (no navbar/footer)
- `signup.html` — registration page (no navbar/footer)
- `forgot-password.html` — password reset page (no navbar/footer)

## Run locally
Open `Home1.html` in a browser, or serve the folder with a local static server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/Home1.html`.

## Notes before production
- The forms are front-end demos only. Connect them to an API/backend and add server-side validation, authentication, secure password handling, and email delivery.
- Replace placeholder contact details, sample package pricing, and `.example` email address.
- Photos are loaded from Unsplash image URLs, so internet access is needed to display them.
- Update copy, pricing, availability, privacy policy, and terms for the actual business.
