from aws_cdk import (
    Stack,
    CfnOutput,
    SecretValue,
    aws_amplify_alpha as amplify,
)
from constructs import Construct

BRANCH_NAME = "main"
# Dossier de l'app front dans le repo (le package.json n'est pas à la racine)
APP_ROOT = "web"


class FrontStack(Stack):
    """Amplify Hosting avec CI/CD natif (Option 1).

    Amplify écoute les commits sur GitHub, lance le build et déploie
    directement sans bucket S3 intermédiaire ni GitHub Actions.
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        *,
        github_owner: str,
        github_repo: str,
        github_token_secret_name: str = "github-token",
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # 1. Application Amplify connectée au dépôt GitHub.
        #    Le buildspec est versionné dans amplify.yml à la racine du repo
        #    (format monorepo, appRoot: web) : Amplify le lit à chaque build.
        app = amplify.App(
            self,
            "PortfolioApp",
            app_name="portfolio",
            source_code_provider=amplify.GitHubSourceCodeProvider(
                owner=github_owner,
                repository=github_repo,
                oauth_token=SecretValue.secrets_manager(github_token_secret_name),
            ),
            # Requis par Amplify pour un buildspec monorepo : doit être égal
            # à appRoot dans amplify.yml
            environment_variables={"AMPLIFY_MONOREPO_APP_ROOT": APP_ROOT},
        )

        # 2. Branche de production avec auto-build activé par défaut
        branch = app.add_branch(
            BRANCH_NAME,
            stage="PRODUCTION",
            auto_build=True,
        )

        self.url = f"https://{BRANCH_NAME}.{app.default_domain}"

        # Outputs
        CfnOutput(self, "AmplifyAppUrl", value=self.url, description="URL du portfolio")
        CfnOutput(self, "AmplifyAppId", value=app.app_id, description="ID de l'application Amplify")