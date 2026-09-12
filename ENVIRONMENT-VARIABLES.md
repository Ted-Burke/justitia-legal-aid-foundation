# Environment variable reference

The project platform protects `.env` and `.env.example` files from direct edits. This reference documents the variable names and purposes without exposing values. Configure real values in the target host's encrypted secret manager.

| Variable | Purpose | Required now |
| --- | --- | --- |
| `DATABASE_URL` | MySQL/TiDB connection string | Only for server persistence |
| `JWT_SECRET` | Session signing secret | Required by Manus scaffold |
| `VITE_APP_ID` | Manus OAuth application id | Required only while Manus OAuth remains |
| `OAUTH_SERVER_URL` | OAuth backend base URL | Required only while Manus OAuth remains |
| `VITE_OAUTH_PORTAL_URL` | Frontend login portal | Required only while Manus OAuth remains |
| `OWNER_OPEN_ID`, `OWNER_NAME` | Project owner identity | Scaffold configuration |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Manus built-in services | Not used by current UI |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Frontend Manus built-in services | Not used by current UI |
| `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID` | Optional analytics | Leave blank until privacy review |

Future independent variables for private storage, email, and donations should be added only after Justitia selects providers and approves the data-processing terms. Never commit the populated values.
