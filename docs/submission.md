# Brouillon : projet Builder Center ("your project")

> À copier-coller dans Builder Center, puis à personnaliser. Les passages entre `<…>` sont à remplacer.
> Le texte est en anglais, comme le site. À publier avant le **vendredi 6 novembre 2026**.

## Checklist avant de publier

- [ ] Le site répond à l'URL Amplify (`AmplifyAppUrl`), y compris en navigation privée et sur mobile
- [ ] Le repo GitHub est **public** et le README s'affiche
- [ ] Le jeu est testé jusqu'au bout sur desktop **et** mobile (le message secret s'affiche)
- [ ] Les 3 liens du header (About, Skills, Projects) mènent aux bonnes sections
- [ ] Les captures ci-dessous sont prises et insérées
- [ ] Le site restera en ligne pendant toute la période de jugement (ne pas `cdk destroy`)

## Captures à prendre

| # | Capture | Comment |
|---|---|---|
| 1 | Hero desktop (globe + nom) | Fenêtre ≥ 1280 px, attendre la fin de l'intro |
| 2 | Section About | |
| 3 | Section Skills (carte des agents + cartes) | |
| 4 | Section Projects & achievements | |
| 5 | Bouton "Incoming signal: tap to decode" visible | Coin bas-droit, desktop |
| 6 | Star map en cours (quelques étoiles reliées) | |
| 7 | Star map résolue avec le message secret | |
| 8 | Vue mobile : hero + bouton "Decode ✦" | DevTools, iPhone 14 ou un vrai téléphone |
| 9 | Console Amplify Hosting : app `portfolio`, branche `main`, déploiement réussi + domaine | Amplify → portfolio → Hosting |
| 10 | Console S3 : bucket privé, préfixe `site/`, "Block all public access" activé | S3 → bucket → onglet Permissions |
| 11 | CloudFormation : stack `PortfolioFrontStack` avec ses Outputs | Onglet Outputs |
| 12 | GitHub Actions : run "Deploy web" au vert | Onglet Actions du repo |

---

## Title

**Orbit: an AI engineer's portfolio with a hidden star map of his journey**

## Links

- Live portfolio: `<https://main.XXXX.amplifyapp.com>`
- GitHub repository: https://github.com/Samuel-engineer/portfolio

## Summary

I'm Samuel, an AI/ML engineer from EFREI Paris working on generative AI, multi-agent systems and MLOps. My portfolio is a single page with three sections (About, Skills, Projects & achievements), a WebGL globe that draws the arcs of my journey, and one hidden feature: an incoming signal that you decode by rebuilding the constellation of my path. It is hosted on AWS Amplify Hosting from a private Amazon S3 bucket, with the infrastructure written in AWS CDK and deployed by GitHub Actions.

`[Capture 1]`

## The creative feature: "Incoming signal"

**The hint.** A pulsing amber button floats in the bottom-right corner on every screen: *"Incoming signal: tap to decode"* on desktop, *"Decode ✦"* on mobile. It wobbles every few seconds until you notice it.

**The game.** It opens a star map. Each star is a real step of my life: the Pan-African Mathematics Olympiad (2021), MP* preparatory classes in Yamoussoukro, EFREI Paris, my first RAG, voice AI on board French trains, my first crew of agents, and this hackathon. You link them in chronological order. A wrong pick shakes the map and resets the chain. After 15 seconds the next star starts pulsing as a hint.

**The reveal.** When the chain is complete, every star lights up, a shooting star crosses the sky and the secret appears. Off-screen I play guitar, and I see multi-agent systems the same way as a band: each part has its role, and the magic is in how they listen to each other.

**Why it reflects me.** My path runs from Côte d'Ivoire to Paris, Kuala Lumpur and Le Mans, and the globe in the hero shows those real trips. The star map turns the same journey into something you discover instead of read. It also echoes what I build: separate pieces that only make sense once they are connected in the right order.

**It never gets in the way.** The game is an accessible modal dialog. Focus is trapped inside, Escape or "Close" exits, every star can be reached with Tab and activated with Enter or Space, and reduced-motion settings are respected. The page behind is frozen while the map is open and restored afterwards, so the core portfolio stays one click away.

`[Captures 5, 6, 7, 8]`

## The three core sections

- **01 · About**: my story, from the math olympiad and preparatory classes in Côte d'Ivoire to EFREI Paris, an AI engineering work-study at SNCF Voyageurs and an internship at InnovQube, plus three working principles.
- **02 · Skills**: five disciplines (Agents, ML/DL, MLOps, Backend, Cloud) drawn as a map of agents exchanging messages around an orchestrator, with one card per domain.
- **03 · Projects & achievements**: an on-board voice assistant for train dashboards (Whisper, Ministral, Piper, local-first), a multi-agent market research studio (CrewAI), an end-to-end predictive maintenance MLOps pipeline, a RAG prototype for a SaaS, and this portfolio. Below them are my certifications (DP-100, AI-900) and the PAMO honourable mention.

A sticky header links to each section and highlights the one you are reading. The layout adapts from phone to wide desktop.

`[Captures 2, 3, 4]`

## AWS implementation

```
GitHub (main) → GitHub Actions: npm build → aws s3 sync → amplify start-deployment
                                              │
                    Amazon S3 (private) ──read by──▶ AWS Amplify Hosting ──HTTPS/CDN──▶ visitors
```

| Service | What it does here |
|---|---|
| **AWS Amplify Hosting** | Serves the site over HTTPS on its `amplifyapp.com` domain through Amplify's global CDN. Branch `main`, production stage, deployed from S3 with no Git connection. |
| **Amazon S3** | Private source bucket for the built site: all public access blocked, SSE-S3 encryption, TLS required. |
| **AWS IAM** | A bucket policy lets only the Amplify service principal read the bucket, restricted by `aws:SourceAccount` and `aws:SourceArn` to this app's branch. |
| **AWS CDK / CloudFormation** | All the infrastructure lives in about 130 lines of Python (`stacks/frontend_stack.py`) and is reproducible with a single `cdk deploy`. |

I followed the "Build a Website on the Cloud" path: Amplify Hosting for hosting and deployment, and S3 for storage. I deployed from a bucket instead of connecting the Git repository, so the build stays in my own CI and the bucket never has to be public. On every push to `main`, GitHub Actions builds the site, syncs it to S3, starts an Amplify deployment and polls the job until it succeeds, so a failed deployment fails the pipeline.

`[Captures 9, 10, 11, 12]`

## Key learnings

- **Amplify Hosting can deploy from a private S3 bucket.** With `StartDeployment` and `sourceUrlType=BUCKET_PREFIX`, I got HTTPS and a CDN without making the bucket public or managing a CloudFront distribution myself.
- **Least privilege needs precise conditions.** The bucket policy only allows `amplify.amazonaws.com`, and only for my branch. The `aws:SourceArn` value has to be the URL-encoded branch ARN, a detail that is easy to miss.
- **Infrastructure as code pays off immediately.** The stack can be destroyed and rebuilt in minutes, and the CDK outputs (app ID, bucket name) feed the CI variables directly.
- **A creative feature must stay accessible.** Building the game as a real dialog (focus trap, keyboard support, reduced motion, scroll lock) took longer than the animation itself, and it was worth it.
- `<one personal learning, e.g. what you would do differently next time>`

## Challenges

- **Amplify L2 constructs are still in alpha.** I used `aws-cdk.aws-amplify-alpha` for the app and branch, and wrote the S3 bucket policy by hand.
- **Making CI fail when the deployment fails.** `start-deployment` returns immediately, so the workflow polls `get-job` until `SUCCEED`, `FAILED` or a timeout.
- **A hint that is visible but never in the way on mobile.** The first version reduced the button to a single dot on phones, which was too subtle. It now shows a short "Decode ✦" label, sized to fit the iOS safe area.
- **Smooth scrolling vs. the modal.** Lenis smooth scrolling and GSAP ScrollTrigger share one animation loop. Opening the map had to stop Lenis, and under reduced motion (where Lenis is off) lock the document scroll directly.
- `<a challenge of your own, e.g. permissions on the IAM user, CDK bootstrap, timing>`

## Built with

React 18 · Vite · Tailwind CSS 4 · GSAP · Lenis · cobe (WebGL globe) · AWS Amplify Hosting · Amazon S3 · AWS IAM · AWS CDK (Python) · GitHub Actions
