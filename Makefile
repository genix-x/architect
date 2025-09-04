# AWS Environment Management
.PHONY: help aws-login aws-dev aws-staging aws-prod aws-who aws-logout

.DEFAULT_GOAL := help

# Colors
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m

help: ## Show help
	@echo "$(BLUE)AWS Environment Management$(NC)"
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo "  $(GREEN)make aws-login$(NC)     - Login to DEV (default)"
	@echo "  $(GREEN)make aws-dev$(NC)       - Switch to DEV and login"
	@echo "  $(GREEN)make aws-staging$(NC)   - Switch to STAGING and login"  
	@echo "  $(GREEN)make aws-prod$(NC)      - Switch to PROD and login"
	@echo "  $(GREEN)make aws-who$(NC)       - Show current AWS identity"
	@echo "  $(GREEN)make aws-logout$(NC)    - Logout from AWS"

aws-login: aws-dev ## Login to DEV environment (default)

aws-dev: ## Switch to DEV environment and login
	@echo "$(BLUE)🔄 Switching to DEV environment...$(NC)"
	@echo 'export AWS_PROFILE=dev' > .envrc
	@echo 'export AWS_REGION=us-east-1' >> .envrc
	@echo 'export AWS_DEFAULT_REGION=us-east-1' >> .envrc
	@echo 'export AWS_ACCOUNT_ID=762924053780' >> .envrc
	@echo 'export ENV=dev' >> .envrc
	@if command -v direnv >/dev/null 2>&1; then direnv allow; fi
	@echo "$(GREEN)✅ Environment set to DEV$(NC)"
	@echo "$(YELLOW)🔐 Logging into AWS SSO...$(NC)"
	@AWS_PROFILE=dev aws sso login --profile dev
	@echo "$(GREEN)✅ Successfully connected to DEV$(NC)"
	@echo "$(YELLOW)Testing connection...$(NC)"
	@AWS_PROFILE=dev aws sts get-caller-identity

aws-staging: ## Switch to STAGING environment and login
	@echo "$(BLUE)🔄 Switching to STAGING environment...$(NC)"
	@echo 'export AWS_PROFILE=staging' > .envrc
	@echo 'export AWS_REGION=us-east-1' >> .envrc
	@echo 'export AWS_DEFAULT_REGION=us-east-1' >> .envrc
	@echo 'export AWS_ACCOUNT_ID=896035377897' >> .envrc
	@echo 'export ENV=staging' >> .envrc
	@if command -v direnv >/dev/null 2>&1; then direnv allow; fi
	@echo "$(GREEN)✅ Environment set to STAGING$(NC)"
	@echo "$(YELLOW)🔐 Logging into AWS SSO...$(NC)"
	@AWS_PROFILE=staging aws sso login --profile staging
	@echo "$(GREEN)✅ Successfully connected to STAGING$(NC)"
	@echo "$(YELLOW)Testing connection...$(NC)"
	@AWS_PROFILE=staging aws sts get-caller-identity

aws-prod: ## Switch to PROD environment and login
	@echo "$(RED)⚠️  PRODUCTION ENVIRONMENT ⚠️$(NC)"
	@echo "$(YELLOW)Press Enter to continue or Ctrl+C to cancel$(NC)"
	@read
	@echo "$(BLUE)🔄 Switching to PROD environment...$(NC)"
	@echo 'export AWS_PROFILE=prod' > .envrc
	@echo 'export AWS_REGION=us-east-1' >> .envrc
	@echo 'export AWS_DEFAULT_REGION=us-east-1' >> .envrc
	@echo 'export AWS_ACCOUNT_ID=429757513125' >> .envrc
	@echo 'export ENV=prod' >> .envrc
	@if command -v direnv >/dev/null 2>&1; then direnv allow; fi
	@echo "$(GREEN)✅ Environment set to PROD$(NC)"
	@echo "$(YELLOW)🔐 Logging into AWS SSO...$(NC)"
	@AWS_PROFILE=prod aws sso login --profile prod
	@echo "$(GREEN)✅ Successfully connected to PROD$(NC)"
	@echo "$(YELLOW)Testing connection...$(NC)"
	@AWS_PROFILE=prod aws sts get-caller-identity

aws-who: ## Show current AWS identity  
	@echo "$(BLUE)👤 Current AWS Identity:$(NC)"
	@if [ -f .envrc ]; then \
		bash -c "source .envrc && aws sts get-caller-identity --profile \$$AWS_PROFILE"; \
	else \
		echo "$(RED)❌ No environment set. Run 'make aws-login' first$(NC)"; \
	fi

aws-logout: ## Logout from AWS SSO
	@echo "$(YELLOW)🔓 Logging out...$(NC)"
	@aws sso logout
	@echo "$(GREEN)✅ Logged out$(NC)"

aws-test: ## Test AWS connection with current profile
	@echo "$(BLUE)🧪 Testing AWS connection...$(NC)"
	@if [ -f .envrc ]; then \
		bash -c "source .envrc && echo 'Using profile: '\$$AWS_PROFILE && aws s3 ls --profile \$$AWS_PROFILE"; \
	else \
		echo "$(RED)❌ No environment set. Run 'make aws-login' first$(NC)"; \
	fi
