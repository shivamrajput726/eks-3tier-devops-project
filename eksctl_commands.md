# `eksctl` Commands Reference

Terraform is the primary provisioning path in this repository. Use `eksctl` only when you want a fast alternative bootstrap flow or you are troubleshooting Terraform-specific issues.

## 1. Create the development cluster

```bash
eksctl create cluster \
  --name eks-3tier-dev \
  --region us-east-1 \
  --version 1.35 \
  --managed \
  --nodegroup-name dev-general \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --with-oidc
```

## 2. Create the production cluster

```bash
eksctl create cluster \
  --name eks-3tier-prod \
  --region us-east-1 \
  --version 1.35 \
  --managed \
  --nodegroup-name prod-general \
  --node-type m6i.large \
  --nodes 3 \
  --nodes-min 2 \
  --nodes-max 6 \
  --zones us-east-1a,us-east-1b,us-east-1c \
  --with-oidc
```

## 3. Verify access

```bash
aws eks update-kubeconfig --region us-east-1 --name eks-3tier-dev
kubectl get nodes
kubectl get ns
```

## 4. Install ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl rollout status deployment/argocd-server -n argocd
```

## 5. Bootstrap the repository into ArgoCD

Development cluster:

```bash
kubectl apply -f argocd/application.yaml
```

Production cluster:

```bash
kubectl apply -f argocd/application-prod.yaml
```

## 6. Confirm the platform add-ons

```bash
kubectl get applications -n argocd
kubectl get pods -n ingress-nginx
kubectl get pods -n monitoring
kubectl get pods -n three-tier-dev
```

## 7. Delete a cluster when finished

```bash
eksctl delete cluster --name eks-3tier-dev --region us-east-1
eksctl delete cluster --name eks-3tier-prod --region us-east-1
```
