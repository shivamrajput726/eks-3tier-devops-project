locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

module "network" {
  source = "../../modules/network"

  project_name         = var.project_name
  environment          = var.environment
  cluster_name         = var.cluster_name
  vpc_cidr             = var.vpc_cidr
  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  single_nat_gateway   = var.single_nat_gateway
  tags                 = local.common_tags
}

module "eks_cluster" {
  source = "../../modules/eks-cluster"

  cluster_name                 = var.cluster_name
  cluster_version              = var.cluster_version
  environment                  = var.environment
  vpc_id                       = module.network.vpc_id
  private_subnet_ids           = module.network.private_subnet_ids
  node_instance_types          = var.node_instance_types
  capacity_type                = var.capacity_type
  node_group_min_size          = var.node_group_min_size
  node_group_max_size          = var.node_group_max_size
  node_group_desired_size      = var.node_group_desired_size
  node_disk_size               = var.node_disk_size
  endpoint_public_access_cidrs = var.endpoint_public_access_cidrs
  tags                         = local.common_tags
}
