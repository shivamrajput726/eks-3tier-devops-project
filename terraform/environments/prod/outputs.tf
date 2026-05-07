output "cluster_name" {
  description = "EKS cluster name."
  value       = module.eks_cluster.cluster_name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint."
  value       = module.eks_cluster.cluster_endpoint
}

output "vpc_id" {
  description = "VPC ID."
  value       = module.network.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs."
  value       = module.network.public_subnet_ids
}

output "private_subnet_ids" {
  description = "Private subnet IDs."
  value       = module.network.private_subnet_ids
}

output "cluster_security_group_id" {
  description = "Cluster security group ID."
  value       = module.eks_cluster.cluster_security_group_id
}

output "node_security_group_id" {
  description = "Node security group ID."
  value       = module.eks_cluster.node_security_group_id
}

output "cluster_iam_role_arn" {
  description = "Control plane IAM role ARN."
  value       = module.eks_cluster.cluster_iam_role_arn
}

output "node_iam_role_arn" {
  description = "Worker node IAM role ARN."
  value       = module.eks_cluster.node_iam_role_arn
}

output "ebs_csi_irsa_role_arn" {
  description = "IRSA IAM role ARN for the EBS CSI driver."
  value       = module.eks_cluster.ebs_csi_irsa_role_arn
}
