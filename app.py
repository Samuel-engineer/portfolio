#!/usr/bin/env python3
import aws_cdk as cdk
from stacks.frontend_stack import FrontStack
from config import get_cdk_environment

app = cdk.App()

env = cdk.Environment(**get_cdk_environment())

front = FrontStack(
    app, "PortfolioFrontStack",
    github_owner="Samuel-engineer",
    github_repo="portfolio",
    env=env
)

app.synth()
