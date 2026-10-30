# Portfolio Orbite v2 — React + Vite + Tailwind v4 + GSAP/ScrollTrigger

Contenu à éditer dans `src/data.js`.

    npm install
    npm run dev       # développement
    npm run build     # produit dist/

## Déployer sur AWS (S3 privé + CloudFront)
1. `npm run build`
2. Bucket S3 privé (Block Public Access activé).
3. Distribution CloudFront, origine = bucket, **Origin Access Control**, Default root object `index.html`, HTTP → HTTPS.
4. Appliquer la bucket policy proposée par CloudFront.
5. `aws s3 sync dist/ s3://NOM_BUCKET --delete`
6. Après modification : `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`
7. Créer une alerte AWS Budgets.
