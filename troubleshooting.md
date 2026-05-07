# Troubleshooting Guide

## 1. ArgoCD applications stay OutOfSync

- Confirm the repo URL in `argocd/application.yaml` or `argocd/application-prod.yaml` matches the actual GitHub repository.
- Check `kubectl get applications -n argocd`.
- Inspect details with `kubectl describe application eks-3tier-workloads-dev -n argocd`.

## 2. GitHub Actions build succeeds but ArgoCD does not deploy

- Confirm the workflow updated `k8s/overlays/dev/kustomization.yaml` or `k8s/overlays/prod/kustomization.yaml`.
- Verify `DOCKERHUB_NAMESPACE` is set as a repository variable.
- Verify `ARGOCD_SERVER` and `ARGOCD_AUTH_TOKEN` are configured if you want explicit sync API calls.

## 3. ArgoCD cannot pull images

- Open the rendered overlay and confirm the image names point to your DockerHub namespace.
- Confirm the image tags exist in DockerHub.
- If the repository is private, add an image pull secret and patch the frontend and backend deployments.

## 4. Ingress does not expose the application

- Check the ingress controller status:

```bash
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
kubectl get ingress -A
```

- If the external address is pending, verify your EKS worker nodes can provision cloud load balancers and that the public subnets are tagged correctly.

## 5. MongoDB pod is running but the backend is not ready

- Check backend readiness:

```bash
kubectl describe pod -n three-tier-dev -l app.kubernetes.io/name=backend
kubectl logs -n three-tier-dev deployment/backend
```

- Check MongoDB:

```bash
kubectl logs -n three-tier-dev statefulset/mongodb
kubectl get pvc -n three-tier-dev
```

## 6. Persistent volume claims remain Pending

- Confirm the EBS CSI add-on is installed.
- Confirm the `gp3` storage class exists.
- Verify the worker node IAM permissions include the CSI role created by Terraform.

## 7. Metrics are missing in Grafana

- Check Prometheus targets:

```bash
kubectl get servicemonitor -n monitoring
kubectl get prometheusrule -n monitoring
```

- Ensure the backend `/metrics` endpoint is reachable:

```bash
kubectl port-forward -n three-tier-dev svc/backend 5000:5000
curl http://localhost:5000/metrics
```

## 8. `kubectl kustomize` fails locally on Windows

- Run the command from a normal local path instead of a restricted OneDrive or sandboxed path when possible.
- If you are in a sandboxed terminal session, validate the same overlays in GitHub Actions where Linux path handling is predictable.

## 9. Terraform init fails for environment stacks

- Make sure the bootstrap stack has already created the S3 bucket and DynamoDB table.
- Pass the backend settings during `terraform init`.
- Verify the AWS credentials in your shell point to the expected account.

## 10. Branch protection does not block merges

- The workflow is only one part of protection.
- In GitHub settings, mark the `Branch Protection` workflow as a required status check and enable PR review requirements.
