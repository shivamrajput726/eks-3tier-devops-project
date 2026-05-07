project_name = "eks-3tier"
environment  = "prod"
region       = "us-east-1"

cluster_name    = "eks-3tier-prod"
cluster_version = "1.35"

vpc_cidr = "10.20.0.0/16"

availability_zones = [
  "us-east-1a",
  "us-east-1b",
  "us-east-1c",
]

public_subnet_cidrs = [
  "10.20.0.0/24",
  "10.20.1.0/24",
  "10.20.2.0/24",
]

private_subnet_cidrs = [
  "10.20.10.0/24",
  "10.20.11.0/24",
  "10.20.12.0/24",
]

single_nat_gateway = false

node_instance_types = ["m6i.large"]
capacity_type       = "ON_DEMAND"

node_group_min_size     = 2
node_group_max_size     = 6
node_group_desired_size = 3
node_disk_size          = 80

endpoint_public_access_cidrs = ["0.0.0.0/0"]
