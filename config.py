from dotenv import load_dotenv
import os

load_dotenv()

CDK_DEFAULT_ACCOUNT = os.getenv("CDK_DEFAULT_ACCOUNT")
CDK_DEFAULT_REGION = os.getenv("CDK_DEFAULT_REGION")


def get_cdk_environment():
    return {
        "account": CDK_DEFAULT_ACCOUNT,
        "region": CDK_DEFAULT_REGION
    }
