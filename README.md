# Master Play Equipments — website

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion · MongoDB/Mongoose · JWT admin · Docker/Coolify.

## Local
```bash
cp .env.example .env.local   # fill MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD; COOKIE_SECURE=false for http
npm install && npm run dev   # http://localhost:3000   admin: /admin
```

## Deploy on Coolify
1. New resource → this repo → **Dockerfile** build pack (or Docker Compose using `docker-compose.yml`). Port **3000**.
2. Environment variables: `MONGODB_URI`, `JWT_SECRET` (`openssl rand -base64 48`), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` (set also as a *build* arg), `UPLOAD_DIR=/data/uploads`.
3. **Persistent storage:** add a volume mounted at `/data/uploads` (admin gallery photos). With the Compose file also keep `mongo_data`; or point `MONGODB_URI` at a Coolify-managed MongoDB.
4. First sign-in at `/admin/login` creates the admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Change/remove those env vars' password after if you rotate it in the DB.

## Data
Products and categories are data-driven: `src/data/catalog.json` + `src/data/categories.ts`. Add a product to the JSON and its listing page, product page, search, sitemap and gallery update automatically. Images live in `public/images`.

## Notes
- Enquiries are stored in MongoDB and read in `/admin`. There is no email notification yet.
- Rate limiting is in-memory (single instance).
