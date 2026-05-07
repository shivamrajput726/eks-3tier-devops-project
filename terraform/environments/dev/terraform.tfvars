project_name = "eks-3tier"
environment  = "dev"
region       = "us-east-1"

cluster_name    = "eks-3tier-dev"
cluster_version = "1.35"

vpc_cidr = "10.10.0.0/16"

availability_zones = [
  "us-east-1a",
  "us-east-1b",
]

public_subnet_cidrs = [
  "10.10.0.0/24",
  "10.10.1.0/24",
]

private_subnet_cidrs = [
  "10.10.10.0/24",
  "10.10.11.0/24",
]

single_nat_gateway = true

node_instance_types = ["t3.medium"]
capacity_type       = "SPOT"

node_group_min_size     = 1
node_group_max_size     = 3
node_group_desired_size = 2
node_disk_size          = 50

endpoint_public_access_cidrs = ["0.0.0.0/0"]
