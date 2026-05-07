PROJECT_NAME := eks-3tier
AWS_REGION ?= us-east-1

.PHONY: help up down logs backend-test frontend-test backend-lint frontend-lint kustomize-dev kustomize-prod monitor-dev monitor-prod tf-bootstrap tf-dev-init tf-dev-plan tf-dev-apply tf-prod-init tf-prod-plan tf-prod-apply

help:
	@echo "Available targets:"
	@echo "  up              Start the local Docker stack"
	@echo "  down            Stop the local Docker stack"
	@echo "  logs            Tail local Docker logs"
	@echo "  backend-lint    Run backend lint locally"
	@echo "  backend-test    Run backend tests locally"
	@echo "  frontend-lint   Run frontend lint locally"
	@echo "  frontend-test   Run frontend tests locally"
	@echo "  kustomize-dev   Render the dev Kubernetes overlay"
	@echo "  kustomize-prod  Render the prod Kubernetes overlay"
	@echo "  monitor-dev     Render the dev monitoring overlay"
	@echo "  monitor-prod    Render the prod monitoring overlay"
	@echo "  tf-bootstrap    Create S3 + DynamoDB remote state backend"
	@echo "  tf-dev-init     Initialize dev Terraform with remote backend"
	@echo "  tf-dev-plan     Plan dev infrastructure"
	@echo "  tf-dev-apply    Apply dev infrastructure"
	@echo "  tf-prod-init    Initialize prod Terraform with remote backend"
	@echo "  tf-prod-plan    Plan prod infrastructure"
	@echo "  tf-prod-apply   Apply prod infrastructure"

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f

backend-lint:
	npm --prefix backend install
	npm --prefix backend run lint

backend-test:
	npm --prefix backend install
	npm --prefix backend test

frontend-lint:
	npm --prefix frontend install
	npm --prefix frontend run lint

frontend-test:
	npm --prefix frontend install
	npm --prefix frontend test

kustomize-dev:
	kubectl kustomize k8s/overlays/dev

kustomize-prod:
	kubectl kustomize k8s/overlays/prod

monitor-dev:
	kubectl kustomize monitoring/overlays/dev

monitor-prod:
	kubectl kustomize monitoring/overlays/prod

tf-bootstrap:
	terraform -chdir=terraform/bootstrap init
	terraform -chdir=terraform/bootstrap apply

tf-dev-init:
	terraform -chdir=terraform/environments/dev init \
		-backend-config="bucket=$$(terraform -chdir=terraform/bootstrap output -raw state_bucket_name)" \
		-backend-config="dynamodb_table=$$(terraform -chdir=terraform/bootstrap output -raw lock_table_name)" \
		-backend-config="region=$(AWS_REGION)" \
		-backend-config="key=dev/terraform.tfstate"

tf-dev-plan:
	terraform -chdir=terraform/environments/dev plan

tf-dev-apply:
	terraform -chdir=terraform/environments/dev apply

tf-prod-init:
	terraform -chdir=terraform/environments/prod init \
		-backend-config="bucket=$$(terraform -chdir=terraform/bootstrap output -raw state_bucket_name)" \
		-backend-config="dynamodb_table=$$(terraform -chdir=terraform/bootstrap output -raw lock_table_name)" \
		-backend-config="region=$(AWS_REGION)" \
		-backend-config="key=prod/terraform.tfstate"

tf-prod-plan:
	terraform -chdir=terraform/environments/prod plan

tf-prod-apply:
	terraform -chdir=terraform/environments/prod apply
