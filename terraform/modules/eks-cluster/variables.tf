variable "cluster_name" {
  description = "Name of the EKS cluster."
  type        = string
}

variable "cluster_version" {
  description = "Kubernetes version for the EKS cluster."
  type        = string
}

variable "environment" {
  description = "Environment name."
  type        = string
}

variable "vpc_id" {
  description = "VPC ID for the EKS cluster."
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs used by the EKS control plane and worker nodes."
  type        = list(string)
}

variable "node_instance_types" {
  description = "Instance types used by the managed node group."
  type        = list(string)
}

variable "capacity_type" {
  description = "Managed node group capacity type."
  type        = string
  default     = "ON_DEMAND"
}

variable "node_group_min_size" {
  description = "Minimum number of worker nodes."
  type        = number
}

variable "node_group_max_size" {
  description = "Maximum number of worker nodes."
  type        = number
}

variable "node_group_desired_size" {
  description = "Desired number of worker nodes."
  type        = number
}

variable "node_disk_size" {
  description = "Disk size in GiB for worker nodes."
  type        = number
  default     = 50
}

variable "endpoint_public_access_cidrs" {
  description = "CIDR blocks allowed to access the Kubernetes API server endpoint."
  type        = list(string)
}

variable "tags" {
  description = "Tags applied to cluster resources."
  type        = map(string)
  default     = {}
}
