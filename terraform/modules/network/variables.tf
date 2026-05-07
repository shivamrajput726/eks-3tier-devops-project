variable "project_name" {
  description = "Project name used for naming."
  type        = string
}

variable "environment" {
  description = "Environment name such as dev or prod."
  type        = string
}

variable "cluster_name" {
  description = "Cluster name used in subnet tagging."
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR block."
  type        = string
}

variable "availability_zones" {
  description = "Availability zones used by the VPC."
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
  description = "Whether to use a single shared NAT gateway."
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags applied to the VPC module resources."
  type        = map(string)
  default     = {}
}
