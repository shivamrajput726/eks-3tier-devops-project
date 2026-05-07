variable "project_name" {
  description = "Project name for tags and resource names."
  type        = string
}

variable "environment" {
  description = "Environment name."
  type        = string
}

variable "region" {
  description = "AWS region."
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster name."
  type        = string
}

variable "cluster_version" {
  description = "EKS Kubernetes version."
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
}

variable "availability_zones" {
  description = "Availability zones for the VPC."
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDRs."
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDRs."
  type        = list(string)
}

variable "single_nat_gateway" {
  description = "Whether to use a single NAT gateway."
  type        = bool
}

variable "node_instance_types" {
  description = "Managed node group instance types."
  type        = list(string)
}

variable "capacity_type" {
  description = "Managed node group capacity type."
  type        = string
}

variable "node_group_min_size" {
  description = "Minimum worker node count."
  type        = number
}

variable "node_group_max_size" {
  description = "Maximum worker node count."
  type        = number
}

variable "node_group_desired_size" {
  description = "Desired worker node count."
  type        = number
}

variable "node_disk_size" {
  description = "Worker node disk size in GiB."
  type        = number
}

variable "endpoint_public_access_cidrs" {
  description = "CIDR blocks that can access the cluster API endpoint."
  type        = list(string)
}
