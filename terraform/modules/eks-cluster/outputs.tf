output "cluster_name" {
  description = "EKS cluster name."
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint."
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Cluster security group ID."
  value       = module.eks.cluster_security_group_id
}

output "node_security_group_id" {
  description = "Node security group ID."
  value       = module.eks.node_security_group_id
}

output "node_iam_role_arn" {
  description = "IAM role ARN used by the worker nodes."
  value       = module.eks.eks_managed_node_groups["default"].iam_role_arn
}

output "cluster_iam_role_arn" {
  description = "IAM role ARN used by the EKS control plane."
  value       = module.eks.cluster_iam_role_arn
}

output "oidc_provider_arn" {
  description = "OIDC provider ARN for the cluster."
  value       = module.eks.oidc_provider_arn
}

output "ebs_csi_irsa_role_arn" {
  description = "IAM role ARN used by the EBS CSI controller service account."
  value       = module.ebs_csi_irsa.arn
}
