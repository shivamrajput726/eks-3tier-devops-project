variable "region" {
  description = "AWS region for the remote state backend resources."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for backend resource naming."
  type        = string
  default     = "eks-3tier"
}

variable "tags" {
  description = "Tags applied to backend resources."
  type        = map(string)
  default = {
    Project     = "eks-3tier"
    ManagedBy   = "terraform"
    Environment = "shared"
  }
}
