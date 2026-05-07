variable "project_name" {
  description = "Project name used when constructing the backend resource names."
  type        = string
}

variable "region" {
  description = "AWS region where the remote state backend resources are provisioned."
  type        = string
}

variable "tags" {
  description = "Tags applied to backend resources."
  type        = map(string)
  default     = {}
}
