variable "bucket_name" {
  description = "The S3 bucket name for the React app"
  type        = string
  default     = "eficode-mrako-atlassian-week-number"
}

variable "aws_region" {
  description = "AWS region"
  default     = "eu-north-1"
}
