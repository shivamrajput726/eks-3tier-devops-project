output "state_bucket_name" {
  description = "Name of the S3 bucket that stores Terraform remote state."
  value       = module.state_backend.bucket_name
}

output "lock_table_name" {
  description = "Name of the DynamoDB table used for Terraform state locking."
  value       = module.state_backend.dynamodb_table_name
}
