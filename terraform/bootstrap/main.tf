module "state_backend" {
  source = "../modules/state-backend"

  project_name = var.project_name
  region       = var.region
  tags         = var.tags
}
