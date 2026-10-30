# Samuel Tan · AI/ML Engineer portfolio

Personal portfolio built for the AWS Builder Center portfolio hackathon. It is a single-page React site with a WebGL globe of my journey and a hidden star-map game, hosted on **AWS Amplify Hosting** from a private **Amazon S3** bucket. The infrastructure is defined with **AWS CDK (Python)** and deployed by **GitHub Actions**.

- Live site: `https://main.<AMPLIFY_APP_ID>.amplifyapp.com` (the `AmplifyAppUrl` output of the stack)
- Repository: https://github.com/Samuel-engineer/portfolio

## What's on the page

| Section | Content | Where |
|---|---|---|
| Hero | Name, role, tagline, WebGL globe linking the places of my journey | `web/src/sections/Hero.jsx`, `web/src/features/globe/` |
| 01 · About | Personal story, from Côte d'Ivoire to EFREI Paris and SNCF | `web/src/sections/About.jsx` |
| 02 · Skills | Skills drawn as a map of cooperating agents, plus one card per domain | `web/src/sections/Skills.jsx`, `web/src/features/AgentsMap.jsx` |
| 03 · Projects & achievements | Work-study, internship and personal projects, plus certifications | `web/src/sections/Projects.jsx` |

The sticky header links to all three sections. All content lives in `web/src/data.js`.

## Creative feature: "Incoming signal" star map

A pulsing amber button stays in the bottom-right corner of every screen. It reads **"Incoming signal: tap to decode"** on desktop and **"Decode ✦"** on mobile. It opens a star map where each star is a real step of my journey (math olympiad 2021 → MP* in Yamoussoukro → EFREI Paris → first RAG → voice AI on trains → first agent crew → this hackathon).

- Link the stars in chronological order. A wrong pick shakes the map and resets the chain.
- After 15 seconds a hint appears and the next star pulses.
- When the chain is complete, every star lights up, a shooting star crosses the map and a personal secret is revealed (guitar, and why I see multi-agent systems like a band).
- It runs in an accessible modal dialog: focus trap, Escape or "Close" to exit, stars reachable with Tab and activated with Enter or Space. Reduced-motion preferences are respected. Page scroll is frozen while it is open and restored afterwards, so the core portfolio is never blocked.

Code: `web/src/components/Beacon.jsx`, `web/src/features/Constellation.jsx`, and the data in `web/src/data.js` (`stars`, `secret`).

## AWS architecture

```
GitHub (main) ──push──▶ GitHub Actions
                          │ npm ci && npm run build   (web/dist)
                          │ aws s3 sync dist s3://<SiteBucket>/site --delete
                          │ aws amplify start-deployment --source-url-type BUCKET_PREFIX
                          ▼
             Amazon S3 (private bucket) ──read by──▶ AWS Amplify Hosting ──HTTPS + CDN──▶ visitors
                                                       (branch "main", stage PRODUCTION)
```

| AWS service | Role in the project | Defined in |
|---|---|---|
| AWS Amplify Hosting | Hosts the site, provides HTTPS, the `amplifyapp.com` domain and the global CDN. Deployed manually from S3, with no Git repo connected | `stacks/frontend_stack.py` (`amplify.App`, branch `main`) |
| Amazon S3 | Private source bucket for the built site (`site/` prefix): all public access blocked, SSE-S3 encryption, TLS enforced | `stacks/frontend_stack.py` (`SiteBucket`) |
| AWS IAM | Bucket policy that lets only the `amplify.amazonaws.com` principal read the bucket, scoped with `aws:SourceAccount` and `aws:SourceArn` to this app's branch. Optional GitHub OIDC role scoped to `main` | `stacks/frontend_stack.py` |
| AWS CloudFormation / CDK | Infrastructure as code. The whole stack is reproducible with one `cdk deploy` | `app.py`, `stacks/` |

Why Amplify reads from S3 instead of building from Git: the build runs in GitHub Actions, and Amplify only serves the result. The bucket stays private, and Amplify Hosting handles HTTPS and CDN distribution with no CloudFront distribution to manage.

## Deploy it yourself

Prerequisites: Node 22, Python 3.13, [uv](https://docs.astral.sh/uv/), the AWS CLI with credentials.

```powershell
# 1. Configuration
Copy-Item .env.example .env      # set CDK_DEFAULT_ACCOUNT, CDK_DEFAULT_REGION, optionally GITHUB_REPO

# 2. Infrastructure (once)
uv sync
npx aws-cdk bootstrap
npx aws-cdk deploy PortfolioFrontStack
# Outputs: AmplifyAppUrl, AmplifyAppId, SiteBucketName (and DeployRoleArn if GITHUB_REPO is set)
```

3. GitHub repository, under *Settings → Secrets and variables → Actions*:
   - Variables: `AWS_REGION`, `SITE_BUCKET` (= `SiteBucketName`), `AMPLIFY_APP_ID` (= `AmplifyAppId`)
   - Secrets (the current workflow authenticates with access keys): `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
4. Push to `main`. The `Deploy web` workflow (`.github/workflows/cicd.yml`) builds, syncs to S3, starts the Amplify deployment and waits for `SUCCEED`.

Local development:

```powershell
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in web/dist
```

## Tech stack

React 18, Vite 5, Tailwind CSS 4, GSAP (scroll and intro animations), Lenis (smooth scroll), cobe (WebGL globe). AWS CDK v2 (Python) with `aws-cdk.aws-amplify-alpha`, and GitHub Actions.

## Project structure

```
app.py, config.py, cdk.json     CDK entry point and configuration (.env)
stacks/frontend_stack.py        S3 + Amplify Hosting + IAM
.github/workflows/cicd.yml      Build and deploy pipeline
web/src/data.js                 All the content
web/src/sections/               Hero, About, Skills, Projects
web/src/features/               Globe, agents map, star-map game
web/src/hooks/                  Motion, scroll, focus trap
```
